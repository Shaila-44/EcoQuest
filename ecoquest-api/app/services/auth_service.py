from datetime import datetime, timezone
import uuid

from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import AuthenticationError, DuplicateError
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.user import User, UserRole
from app.repositories.user_repo import UserRepository
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse


class AuthService:
    """Business logic for authentication operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def register(self, data: RegisterRequest) -> User:
        """Register a new user."""
        existing_user = await self.user_repo.get_by_email(data.email)
        if existing_user:
            raise DuplicateError(f"User with email '{data.email}' already exists")

        # Parse role or default to STUDENT
        role = UserRole.STUDENT
        if data.role:
            try:
                role = UserRole(data.role.lower())
            except ValueError:
                role = UserRole.STUDENT

        user = User(
            email=data.email,
            password_hash=hash_password(data.password),
            first_name=data.first_name,
            last_name=data.last_name,
            role=role,
            grade=data.grade,
        )

        return await self.user_repo.create(user)

    async def login(self, data: LoginRequest) -> TokenResponse:
        """Authenticate user credentials and issue tokens."""
        user = await self.user_repo.get_by_email(data.email)
        if not user or not verify_password(data.password, user.password_hash):
            raise AuthenticationError("Invalid email or password")

        if not user.is_active:
            raise AuthenticationError("Account is inactive")

        user.last_login_at = datetime.now(timezone.utc)
        await self.user_repo.update(user, {"last_login_at": user.last_login_at})

        access_token = create_access_token(
            data={"sub": str(user.id), "role": user.role.value}
        )
        refresh_token = create_refresh_token(
            data={"sub": str(user.id)}
        )

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
        )

    async def refresh_token(self, refresh_token: str) -> TokenResponse:
        """Issue a new access token using a valid refresh token."""
        try:
            payload = decode_token(refresh_token)
            user_id_str = payload.get("sub")
            token_type = payload.get("type")

            if not user_id_str or token_type != "refresh":
                raise AuthenticationError("Invalid refresh token")

            user_id = uuid.UUID(user_id_str)
        except (JWTError, ValueError):
            raise AuthenticationError("Invalid or expired refresh token")

        user = await self.user_repo.get_by_id(user_id)
        if not user or not user.is_active:
            raise AuthenticationError("User not found or inactive")

        access_token = create_access_token(
            data={"sub": str(user.id), "role": user.role.value}
        )
        new_refresh_token = create_refresh_token(
            data={"sub": str(user.id)}
        )

        return TokenResponse(
            access_token=access_token,
            refresh_token=new_refresh_token,
            token_type="bearer",
        )

    async def logout(self, refresh_token: str | None = None) -> None:
        """Invalidate user session / refresh token."""
        # Stateless JWT logout placeholder; can be expanded if token blacklisting is implemented
        return None

