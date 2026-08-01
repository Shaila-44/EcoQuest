from __future__ import annotations

"""EcoQuest API — User Service.


Handles user profile management and admin user operations.
"""

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.user import UserRead, UserUpdate


class UserService:
    """Business logic for user operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def get_profile(self, user: User) -> UserRead:
        """Return the UserRead schema representation for the user."""
        return UserRead.model_validate(user)

    async def update_profile(self, user: User, data: UserUpdate) -> UserRead:
        """Update user profile fields and return updated profile."""
        update_data = {}
        if data.first_name is not None or data.last_name is not None:
            fn = data.first_name if data.first_name is not None else user.first_name
            ln = data.last_name if data.last_name is not None else user.last_name
            update_data["name"] = f"{fn.strip()} {ln.strip()}".strip()

        if data.avatar_url is not None:
            update_data["profile_image"] = data.avatar_url

        if update_data:
            user = await self.user_repo.update(user, update_data)

        return UserRead.model_validate(user)

