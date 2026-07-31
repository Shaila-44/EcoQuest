"""EcoQuest API — User Service.

Handles user profile management and admin user operations.
"""

import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import UserStatus
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.user import UserRead, UserUpdate


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
        """Update a user profile."""
        user = await self.get_profile(user_id)
        update_dict = data.model_dump(exclude_unset=True)
        return await self.user_repo.update(user, update_dict)

    async def list_users(self, offset: int = 0, limit: int = 20) -> list[User]:
        """List all users (admin scope)."""
        return await self.user_repo.list(offset=offset, limit=limit)

    async def deactivate_user(self, user_id: uuid.UUID) -> None:
        """Deactivate a user account."""
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )

        await self.user_repo.update(
            user,
            {"status": UserStatus.SUSPENDED},
        )
