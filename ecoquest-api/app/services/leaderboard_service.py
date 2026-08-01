"""EcoQuest API — Leaderboard Service.

Handles leaderboard queries and materialized view refresh.
"""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.leaderboard_repo import LeaderboardRepository
from app.schemas.leaderboard import LeaderboardRead


class LeaderboardService:
    """Business logic for leaderboard operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_overall_leaderboard(self, limit: int = 100) -> list[LeaderboardRead]:
        """Fetch the overall leaderboard."""
        repo = LeaderboardRepository(self.session)
        entries = await repo.get_global(limit)
        return [LeaderboardRead.model_validate(e) for e in entries]

    async def get_school_leaderboard(self, school_id: uuid.UUID, limit: int = 100) -> list[LeaderboardRead]:
        """Fetch the leaderboard for a specific school."""
        repo = LeaderboardRepository(self.session)
        entries = await repo.get_by_school(school_id, limit)
        return [LeaderboardRead.model_validate(e) for e in entries]

    async def get_user_rank(self, user_id: uuid.UUID) -> LeaderboardRead | None:
        """Fetch the rank for a specific user."""
        repo = LeaderboardRepository(self.session)
        entry = await repo.get_rank_for_user(user_id)
        if not entry:
            return None
        return LeaderboardRead.model_validate(entry)
