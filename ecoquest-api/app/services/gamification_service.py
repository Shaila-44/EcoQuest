"""EcoQuest API — Gamification Service.

Handles points, levels, streaks, badges, and trust score calculations.
"""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession


class GamificationService:
    """Business logic for gamification mechanics."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def award_points(self, user_id: uuid.UUID, points: int) -> None:
        """Award points to a user and update their leaderboard entry."""
        from app.repositories.leaderboard_repo import LeaderboardRepository
        repo = LeaderboardRepository(self.session)
        
        # Get or create leaderboard entry
        entry = await repo.get_rank_for_user(user_id)
        if entry:
            entry.total_points += points
            await repo.update(entry, {"total_points": entry.total_points})
        else:
            from app.models.leaderboard import Leaderboard
            new_entry = Leaderboard(user_id=user_id, total_points=points)
            await repo.create(new_entry)
