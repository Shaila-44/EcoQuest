from __future__ import annotations

"""EcoQuest API — Leaderboard Service.

Handles leaderboard queries and score aggregation updates.
"""

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.leaderboard import LeaderboardEntry
from app.repositories.leaderboard_repo import LeaderboardRepository



class LeaderboardService:
    """Business logic for leaderboard operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.leaderboard_repo = LeaderboardRepository(session)

    async def get_overall_leaderboard(
        self,
        limit: int = 50,
    ) -> list[LeaderboardEntry]:
        """Fetch the overall top student leaderboard."""
        return await self.leaderboard_repo.get_global(limit)

    async def get_school_leaderboard(
        self,
        school_id: uuid.UUID,
        limit: int = 50,
    ) -> list[LeaderboardEntry]:
        """Fetch the leaderboard for a specific school."""
        return await self.leaderboard_repo.get_by_school(
            school_id,
            limit=limit,
        )

    async def get_user_rank(
        self,
        user_id: uuid.UUID,
    ) -> LeaderboardEntry | None:
        """Get the leaderboard entry for a user."""
        return await self.leaderboard_repo.get_rank_for_user(user_id)

    async def update_leaderboard_entry(
        self,
        user_id: uuid.UUID,
        points_awarded: int,
    ) -> None:
        """Increment a user's leaderboard points. School scoping is derived via the User relation at query time."""
        entry = await self.leaderboard_repo.get_rank_for_user(user_id)

        if entry:
            entry.total_points += points_awarded
            await self.leaderboard_repo.update(
                entry,
                {"total_points": entry.total_points},
            )
        else:
            new_entry = LeaderboardEntry(
                user_id=user_id,
                total_points=points_awarded,
            )
            await self.leaderboard_repo.create(new_entry)
