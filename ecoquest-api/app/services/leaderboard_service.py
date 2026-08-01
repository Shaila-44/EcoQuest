from __future__ import annotations

"""EcoQuest API — Leaderboard Service.

Handles leaderboard queries and score aggregation updates with TTL caching.
"""

import time
import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.leaderboard import Leaderboard
from app.repositories.leaderboard_repo import LeaderboardRepository

_LEADERBOARD_CACHE: dict[str, tuple[float, list[Leaderboard]]] = {}
_CACHE_TTL_SECONDS = 10.0


class LeaderboardService:
    """Business logic for leaderboard operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.leaderboard_repo = LeaderboardRepository(session)

    async def get_overall_leaderboard(
        self,
        limit: int = 50,
    ) -> list[Leaderboard]:
        """Fetch the overall top student leaderboard with TTL caching."""
        cache_key = f"global_{limit}"
        now = time.time()
        if cache_key in _LEADERBOARD_CACHE:
            ts, cached_data = _LEADERBOARD_CACHE[cache_key]
            if now - ts < _CACHE_TTL_SECONDS:
                return cached_data

        ranks = await self.leaderboard_repo.list_top_ranks(limit)
        _LEADERBOARD_CACHE[cache_key] = (now, ranks)
        return ranks

    async def get_school_leaderboard(
        self,
        school_id: uuid.UUID,
        limit: int = 50,
    ) -> list[Leaderboard]:
        """Fetch the leaderboard for a specific school."""
        return await self.leaderboard_repo.get_by_school(
            school_id,
            limit=limit,
        )

    async def get_user_rank(
        self,
        user_id: uuid.UUID,
    ) -> Leaderboard | None:
        """Get the leaderboard entry for a user."""
        return await self.leaderboard_repo.get_rank_for_user(user_id)

    async def update_leaderboard_entry(
        self,
        user_id: uuid.UUID,
        school_id: uuid.UUID,
        points_awarded: int,
    ) -> None:
        """Increment a user's leaderboard points and invalidate cache."""
        _LEADERBOARD_CACHE.clear()
        entry = await self.leaderboard_repo.get_rank_for_user(user_id)

        if entry:
            entry.total_points += points_awarded
            await self.leaderboard_repo.update(
                entry,
                {"total_points": entry.total_points},
            )
        else:
            new_entry = Leaderboard(
                user_id=user_id,
                school_id=school_id,
                total_points=points_awarded,
            )
            await self.leaderboard_repo.create(new_entry)
