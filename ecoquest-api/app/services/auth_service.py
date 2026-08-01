from __future__ import annotations

"""EcoQuest API — Auth Service.


Handles authentication business logic: registration, login,
token creation, token refresh, and logout.
"""

import hashlib
import uuid

from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import AuthenticationError, DuplicateError
from app.core.security import create_access_token, create_refresh_token, decode_token, hash_password, verify_password
from app.models.enums import RoleName, UserStatus
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse


class AuthService:
    """Business logic for authentication operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def register(self, data: RegisterRequest) -> User:
        """Register a new user after verifying unique email and hashing password."""
        email_clean = data.email.lower().strip()
        email_hash = hashlib.sha256(email_clean.encode("utf-8")).hexdigest()

        existing_user = await self.user_repo.get_by_email_hash(email_hash)
        if existing_user is not None:
            raise DuplicateError("User with this email already exists")

        # Resolve role
        role_map = {
            "student": RoleName.STUDENT,
            "teacher": RoleName.TEACHER,
            "school admin": RoleName.SCHOOL_ADMIN,
            "school_admin": RoleName.SCHOOL_ADMIN,
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

    async def login(self, data: LoginRequest) -> TokenResponse:
        """Authenticate user credentials and issue access/refresh token pair."""
        email_clean = data.email.lower().strip()
        email_hash = hashlib.sha256(email_clean.encode("utf-8")).hexdigest()

        user = await self.user_repo.get_by_email_hash(email_hash)
        if user is None or not verify_password(data.password, user.password_hash):
            raise AuthenticationError("Invalid email or password")

        if user.status != UserStatus.ACTIVE:
            raise AuthenticationError("User account is inactive")

        access_token = create_access_token({"sub": str(user.user_id)})
        refresh_token = create_refresh_token({"sub": str(user.user_id)})

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
        )

    async def refresh_token(self, refresh_token_str: str) -> TokenResponse:
        """Exchange a valid refresh token for a new access & refresh token pair."""
        try:
            payload = decode_token(refresh_token_str)
            user_id_str = payload.get("sub")
            token_type = payload.get("type")
            if not user_id_str or token_type != "refresh":
                raise AuthenticationError("Invalid refresh token")
        except JWTError:
            raise AuthenticationError("Invalid or expired refresh token")

        try:
            user_id = uuid.UUID(user_id_str)
        except ValueError:
            raise AuthenticationError("Invalid token subject")

        user = await self.user_repo.get_by_id(user_id)
        if user is None or user.status != UserStatus.ACTIVE:
            raise AuthenticationError("User not found or inactive")

        new_access_token = create_access_token({"sub": str(user.user_id)})
        new_refresh_token = create_refresh_token({"sub": str(user.user_id)})

        return TokenResponse(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
            token_type="bearer",
        )

    async def logout(self, refresh_token_str: str | None = None) -> None:
        """Stateless logout handler."""
        pass

