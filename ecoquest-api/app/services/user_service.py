import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.user import UserUpdate


class UserService:
    """Business logic for user operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def get_profile(self, user_id: uuid.UUID) -> User:
        """Fetch user by ID or raise NotFoundError."""
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise NotFoundError("User", str(user_id))
        return user

    async def update_profile(self, user: User, data: UserUpdate) -> User:
        """Update profile attributes for a user."""
        update_dict = data.model_dump(exclude_unset=True)
        if update_dict:
            user = await self.user_repo.update(user, update_dict)
        return user

