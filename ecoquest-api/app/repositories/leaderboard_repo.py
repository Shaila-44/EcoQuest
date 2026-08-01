"""EcoQuest API — Leaderboard Repository."""

import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.leaderboard import Leaderboard
from app.repositories.base import BaseRepository


class LeaderboardRepository(BaseRepository[Leaderboard]):
    """Data access layer for Leaderboard operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(Leaderboard, session)

    async def get_global(self, limit: int = 100) -> list[Leaderboard]:
        """Fetch the overall global leaderboard."""
        stmt = (
            select(Leaderboard)
            .order_by(Leaderboard.total_points.desc())
            .limit(limit)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_by_school(self, school_id: uuid.UUID, limit: int = 100) -> list[Leaderboard]:
        """Fetch the leaderboard for a specific school."""
        from app.models.user import User
        stmt = (
            select(Leaderboard)
            .join(Leaderboard.user)
            .where(User.school_id == school_id)
            .order_by(Leaderboard.total_points.desc())
            .limit(limit)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_rank_for_user(self, user_id: uuid.UUID) -> Leaderboard | None:
        """Get the leaderboard entry for a single user."""
        stmt = select(Leaderboard).where(Leaderboard.user_id == user_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
