from __future__ import annotations

"""EcoQuest API — Auth Service.

Handles authentication business logic: registration, login,
token creation, token refresh, logout, session management,
device approvals, and password changes.
"""
import hashlib
import logging
import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.enums import RoleName, UserStatus
from app.models.user import User
from app.models.user_session import UserSession
from app.repositories.session_repo import SessionRepository
from app.repositories.user_repo import UserRepository
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.session import LoginResponseEnvelope

logger = logging.getLogger(__name__)


class AuthService:
    """Business logic for authentication and session operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)
        self.session_repo = SessionRepository(session)

    async def register(self, data: RegisterRequest) -> User:
        """Register a new user after verifying unique email and hashing password with Argon2id."""
        email_clean = data.email.lower().strip()
        email_hash = hashlib.sha256(email_clean.encode("utf-8")).hexdigest()

        existing_user = await self.user_repo.get_by_email_hash(email_hash)
        if existing_user is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A user with this email address already exists.",
            )

        # Resolve role enum
        role_map = {
            "student": RoleName.STUDENT,
            "user": RoleName.STUDENT,
            "teacher": RoleName.TEACHER,
            "school admin": RoleName.SCHOOL_ADMIN,
            "school_admin": RoleName.SCHOOL_ADMIN,
            "admin": RoleName.SUPER_ADMIN,
            "super admin": RoleName.SUPER_ADMIN,
            "super_admin": RoleName.SUPER_ADMIN,
        }
        role_name = role_map.get(data.role.lower().strip(), RoleName.STUDENT)
        role = await self.user_repo.get_or_create_role(role_name)

        # Resolve school
        school = await self.user_repo.get_or_create_default_school(data.school_code)

        hashed_pwd = hash_password(data.password)
        name = f"{data.first_name.strip()} {data.last_name.strip()}".strip()

        user = User(
            school_id=school.school_id,
            role_id=role.role_id,
            name=name,
            email_encrypted=email_clean,
            email_hash=email_hash,
            password_hash=hashed_pwd,
            status=UserStatus.ACTIVE,
        )
        user.role = role
        user.school = school

        return await self.user_repo.create(user)

    async def login(
        self,
        data: LoginRequest,
        device_id: str = "default-device",
        device_name: str = "Browser Session",
        ip_address: str | None = None,
    ) -> LoginResponseEnvelope:
        """Authenticate user credentials, enforce one-device policy, and manage sessions."""
        email_clean = data.email.lower().strip()
        email_hash = hashlib.sha256(email_clean.encode("utf-8")).hexdigest()

        user = await self.user_repo.get_by_email_hash(email_hash)
        if user is None or not verify_password(data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password.",
            )

        if user.status != UserStatus.ACTIVE:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Account is {user.status.value.lower()}.",
            )

        # Check for an active session on another device (One-Device Login Enforcement)
        active_session = await self.session_repo.get_active_session_by_user(user.user_id)
        if active_session is not None and active_session.device_id != device_id:
            # Another device currently has an active session -> Trigger New Device Approval Workflow
            approval = await self.session_repo.create_device_approval(
                user_id=user.user_id,
                device_id=device_id,
                device_name=device_name,
                ip_address=ip_address,
            )
            return LoginResponseEnvelope(
                status="APPROVAL_REQUIRED",
                request_id=approval.request_id,
                message="Login from a new device requires approval from your active device session.",
            )

        # No conflicting device session -> Issue tokens and create DB UserSession
        user_role = "USER"
        if "role" in user.__dict__ and user.role:
            r_val = getattr(user.role, "role_name", None)
            user_role = r_val.value if hasattr(r_val, "value") else str(r_val)

        claims = {"sub": str(user.user_id), "role": user_role}
        access_token = create_access_token(claims, role=user_role)
        refresh_token = create_refresh_token(claims, role=user_role)

        # Persist DB Session with SHA-256 hash of refresh token
        await self.session_repo.create_session(
            user_id=user.user_id,
            refresh_token=refresh_token,
            device_id=device_id,
            device_name=device_name,
        )

        return LoginResponseEnvelope(
            status="SUCCESS",
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
        )

    async def refresh_token(self, refresh_token_str: str) -> TokenResponse:
        """Exchange a valid RS256 refresh token using Refresh Token Rotation."""
        try:
            payload = decode_token(refresh_token_str)
            if payload.get("type") != "refresh":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid refresh token type.",
                )
            user_id_str = payload.get("sub")
            if not user_id_str:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token claims.",
                )
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token.",
            )

        # Verify DB session matching the refresh token hash
        db_session = await self.session_repo.get_session_by_token_hash(refresh_token_str)
        if db_session is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token is revoked, invalid, or expired.",
            )

        user_id = uuid.UUID(str(user_id_str))
        user = await self.user_repo.get_by_id(user_id)
        if user is None or user.status != UserStatus.ACTIVE:
            # Revoke session if user is inactive/disabled
            await self.session_repo.revoke_session(db_session.session_id)
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive or disabled.",
            )

        user_role = "USER"
        if "role" in user.__dict__ and user.role:
            r_val = getattr(user.role, "role_name", None)
            user_role = r_val.value if hasattr(r_val, "value") else str(r_val)

        claims = {"sub": str(user.user_id), "role": user_role}
        new_access = create_access_token(claims, role=user_role)
        new_refresh = create_refresh_token(claims, role=user_role)

        # Rotate refresh token hash in PostgreSQL database
        await self.session_repo.rotate_refresh_token(db_session, new_refresh)

        return TokenResponse(
            access_token=new_access,
            refresh_token=new_refresh,
            token_type="bearer",
        )

    async def logout(self, user_id: uuid.UUID, refresh_token_str: str | None = None) -> None:
        """Revoke user refresh token session in PostgreSQL."""
        if refresh_token_str:
            db_session = await self.session_repo.get_session_by_token_hash(refresh_token_str)
            if db_session:
                await self.session_repo.revoke_session(db_session.session_id)
                return
        await self.session_repo.revoke_all_user_sessions(user_id)

    async def change_password(self, user: User, current_pwd: str, new_pwd: str) -> None:
        """Change password after verifying current password and revoking all active sessions."""
        if not verify_password(current_pwd, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect current password.",
            )

        new_hash = hash_password(new_pwd)
        await self.user_repo.update(user, {"password_hash": new_hash})

        # Revoke all active sessions upon password change
        await self.session_repo.revoke_all_user_sessions(user.user_id)

    async def get_active_sessions(self, user_id: uuid.UUID) -> list[UserSession]:
        """Fetch all active sessions for a user."""
        return await self.session_repo.list_active_sessions(user_id)

    async def revoke_session(self, user: User, session_id: uuid.UUID) -> None:
        """Revoke a specific session."""
        success = await self.session_repo.revoke_session(session_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or already revoked.",
            )

    async def logout_all(self, user_id: uuid.UUID) -> int:
        """Revoke all active sessions for a user."""
        return await self.session_repo.revoke_all_user_sessions(user_id)

    async def get_pending_device_requests(self, user_id: uuid.UUID):
        """Fetch pending device login requests."""
        return await self.session_repo.get_pending_device_approvals(user_id)

    async def approve_device_request(self, user: User, request_id: uuid.UUID) -> TokenResponse:
        """Approve a pending device login request, revoking old sessions and creating a new active session."""
        approval = await self.session_repo.get_device_approval_by_id(request_id)
        if not approval or approval.user_id != user.user_id or approval.status != "PENDING":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Pending device approval request not found.",
            )

        # Approve request
        approval.status = "APPROVED"
        self.session.add(approval)

        # Revoke old active sessions
        await self.session_repo.revoke_all_user_sessions(user.user_id)

        # Generate tokens and new DB session for the approved device
        user_role = "USER"
        if "role" in user.__dict__ and user.role:
            r_val = getattr(user.role, "role_name", None)
            user_role = r_val.value if hasattr(r_val, "value") else str(r_val)

        claims = {"sub": str(user.user_id), "role": user_role}
        access_token = create_access_token(claims, role=user_role)
        refresh_token = create_refresh_token(claims, role=user_role)

        await self.session_repo.create_session(
            user_id=user.user_id,
            refresh_token=refresh_token,
            device_id=approval.device_id,
            device_name=approval.device_name,
        )

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
        )

    async def reject_device_request(self, user: User, request_id: uuid.UUID) -> None:
        """Reject a pending device login request."""
        approval = await self.session_repo.get_device_approval_by_id(request_id)
        if not approval or approval.user_id != user.user_id or approval.status != "PENDING":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Pending device approval request not found.",
            )
        approval.status = "REJECTED"
        self.session.add(approval)


