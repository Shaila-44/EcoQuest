"""EcoQuest API — User Repository."""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    """Data access layer for User operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def get_by_id(self, id) -> User | None:
        """Fetch a user by primary key with role preloaded."""
        from sqlalchemy.orm import selectinload
        stmt = select(User).where(User.user_id == id).options(selectinload(User.role))
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email_hash(self, email_hash: str) -> User | None:
        """Fetch a user by email hash."""
        stmt = select(User).where(User.email_hash == email_hash)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
        
    async def get_by_phone_hash(self, phone_hash: str) -> User | None:
        """Fetch a user by phone hash."""
        stmt = select(User).where(User.phone_hash == phone_hash)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
