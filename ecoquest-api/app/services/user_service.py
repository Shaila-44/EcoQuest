import logging
import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import UserStatus
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.user import UserRead, UserUpdate

logger = logging.getLogger(__name__)


class UserService:
    """Business logic for user operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def get_profile(self, user_id: uuid.UUID) -> User:
        """Fetch a user by ID."""
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )
        return user

    async def update_profile(self, user_id: uuid.UUID, data: UserUpdate) -> User:
        """Update a user profile with transaction safety."""
        user = await self.get_profile(user_id)
        update_dict = data.model_dump(exclude_unset=True)
        try:
            updated_user = await self.user_repo.update(user, update_dict)
            await self.session.flush()
            return updated_user
        except Exception as exc:
            logger.error("Error updating profile for user %s: %s", user_id, exc)
            await self.session.rollback()
            if isinstance(exc, HTTPException):
                raise exc
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update user profile.",
            )

    async def list_users(self, offset: int = 0, limit: int = 20) -> list[User]:
        """List all users (admin scope)."""
        return await self.user_repo.list(offset=offset, limit=limit)

    async def deactivate_user(self, user_id: uuid.UUID) -> None:
        """Deactivate a user account with transaction safety."""
        user = await self.get_profile(user_id)
        try:
            await self.user_repo.update(
                user,
                {"status": UserStatus.SUSPENDED},
            )
            await self.session.flush()
        except Exception as exc:
            logger.error("Error deactivating user %s: %s", user_id, exc)
            await self.session.rollback()
            if isinstance(exc, HTTPException):
                raise exc
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to deactivate user account.",
            )
