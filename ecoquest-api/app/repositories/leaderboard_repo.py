"""EcoQuest API — Leaderboard Repository."""

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.leaderboard import LeaderboardEntry
from app.repositories.base import BaseRepository


class LeaderboardRepository(BaseRepository[LeaderboardEntry]):
    """Data access layer for Leaderboard operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(LeaderboardEntry, session)

    # TODO: Add custom queries:
    # - get_by_school(school_id, limit)
    # - get_rank_for_user(user_id)
    # - refresh_materialized_view()
