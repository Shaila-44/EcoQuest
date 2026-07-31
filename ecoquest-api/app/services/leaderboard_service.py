"""EcoQuest API — Leaderboard Service.

Handles leaderboard queries and materialized view refresh.
"""

from sqlalchemy.ext.asyncio import AsyncSession


class LeaderboardService:
    """Business logic for leaderboard operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    # TODO: Implement:
    # - get_overall_leaderboard(pagination) -> PaginatedResponse
    # - get_school_leaderboard(school_id, pagination) -> PaginatedResponse
    # - get_user_rank(user_id) -> LeaderboardEntryRead
    # - refresh_leaderboard() -> None
