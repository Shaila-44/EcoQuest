"""EcoQuest API — Auth Service.

Handles authentication business logic: registration, login,
token creation, token refresh, and logout.
"""

import hashlib
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.role import Role
from app.models.school import School
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse


class AuthService:
    """Business logic for authentication operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def register(self, data: RegisterRequest) -> User:
        """Register a new user."""
        email_hash = hashlib.sha256(data.email.lower().strip().encode()).hexdigest()
        existing_user = await self.user_repo.get_by_email_hash(email_hash)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A user with this email address already exists.",
            )

        # Lookup role (default student)
        stmt = select(Role).where(Role.name == data.role.lower())
        result = await self.session.execute(stmt)
        role = result.scalar_one_or_none()
        if not role:
            # Fallback to student role
            stmt_fallback = select(Role).where(Role.name == "student")
            result_fallback = await self.session.execute(stmt_fallback)
            role = result_fallback.scalar_one_or_none()
            if not role:
                # If DB seed hasn't run, create a transient Role
                role = Role(name=data.role.lower())
                self.session.add(role)
                await self.session.flush()

        # Lookup school by code or fallback to default school
        school_id = None
        if data.school_code:
            stmt_school = select(School).where(School.code == data.school_code)
            res_school = await self.session.execute(stmt_school)
            school = res_school.scalar_one_or_none()
            if school:
                school_id = school.school_id

        if not school_id:
            stmt_any_school = select(School).limit(1)
            res_any = await self.session.execute(stmt_any_school)
            any_school = res_any.scalar_one_or_none()
            if any_school:
                school_id = any_school.school_id
            else:
                default_school = School(name="Default EcoQuest Academy", code="ECO001", address="Online")
                self.session.add(default_school)
                await self.session.flush()
                school_id = default_school.school_id

        new_user = User(
            name=f"{data.first_name} {data.last_name}".strip(),
            email_encrypted=data.email,
            email_hash=email_hash,
            password_hash=hash_password(data.password),
            school_id=school_id,
            role_id=role.role_id,
            trust_score=100.0,
        )

        return await self.user_repo.create(new_user)

    async def login(self, data: LoginRequest) -> TokenResponse:
        """Authenticate user credentials and return access + refresh tokens."""
        email_hash = hashlib.sha256(data.email.lower().strip().encode()).hexdigest()
        user = await self.user_repo.get_by_email_hash(email_hash)

        if not user or not verify_password(data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password.",
            )

        if not user.is_active if hasattr(user, "is_active") else user.status.value != "active":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive or deactivated.",
            )

        claims = {"sub": str(user.user_id), "role": user.role.name if user.role else "student"}
        access_token = create_access_token(claims)
        refresh_token = create_refresh_token(claims)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
        )

    async def refresh_token(self, refresh_token: str) -> TokenResponse:
        """Exchange a valid refresh token for a new access token pair."""
        try:
            payload = decode_token(refresh_token)
            if payload.get("type") != "refresh":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid refresh token type.",
                )
            user_id = payload.get("sub")
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token claims.",
                )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token.",
            )

        claims = {"sub": user_id}
        new_access = create_access_token(claims)
        new_refresh = create_refresh_token(claims)

        return TokenResponse(
            access_token=new_access,
            refresh_token=new_refresh,
            token_type="bearer",
        )
