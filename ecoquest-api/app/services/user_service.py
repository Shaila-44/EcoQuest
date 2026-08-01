"""EcoQuest API — User Service.

Handles user profile management and admin user operations.
"""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.user_repo import UserRepository
from app.schemas.user import UserRead, UserUpdate
from app.models.enums import UserStatus
from app.core.exceptions import NotFoundError


class UserService:
    """Business logic for user operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_profile(self, user_id: uuid.UUID) -> UserRead:
        """Fetch a user profile by ID."""
        repo = UserRepository(self.session)
        user = await repo.get_by_id(user_id)
        if not user:
            raise NotFoundError("User", str(user_id))
        return UserRead.model_validate(user)

    async def update_profile(self, user_id: uuid.UUID, data: UserUpdate) -> UserRead:
        """Update a user's profile."""
        repo = UserRepository(self.session)
        user = await repo.get_by_id(user_id)
        if not user:
            raise NotFoundError("User", str(user_id))
        
        updated_user = await repo.update(user, data.model_dump(exclude_unset=True))
        return UserRead.model_validate(updated_user)

    async def deactivate_user(self, user_id: uuid.UUID) -> None:
        """Deactivate a user account."""
        repo = UserRepository(self.session)
        user = await repo.get_by_id(user_id)
        if not user:
            raise NotFoundError("User", str(user_id))
        
        await repo.update(user, {"status": UserStatus.SUSPENDED})
