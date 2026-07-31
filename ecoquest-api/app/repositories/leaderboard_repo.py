"""EcoQuest API — Leaderboard Repository."""

import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.leaderboard import LeaderboardEntry
from app.repositories.base import BaseRepository


class LeaderboardRepository(BaseRepository[LeaderboardEntry]):
    """Data access layer for Leaderboard operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(LeaderboardEntry, session)

    async def get_by_school(self, school_id: uuid.UUID, limit: int = 100) -> list[LeaderboardEntry]:
        """Fetch the leaderboard for a specific school."""
        stmt = (
            select(LeaderboardEntry)
            .where(LeaderboardEntry.school_id == school_id)
            .order_by(LeaderboardEntry.total_points.desc())
            .limit(limit)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_rank_for_user(self, user_id: uuid.UUID) -> LeaderboardEntry | None:
        """Get the leaderboard entry for a single user."""
        stmt = select(LeaderboardEntry).where(LeaderboardEntry.user_id == user_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
