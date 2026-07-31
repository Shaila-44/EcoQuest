"""EcoQuest API — Gamification Service.

Dedicated service for rewards mechanics:
- Award XP & Level progression
- Evaluate & save unlocked Badges
- Recalculate & record Trust Score history
- Update Leaderboard standings

Follows clean architecture:
- NO Gemini API calls
- NO image processing
- NO upload handling
"""

import math
import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.badge import Badge
from app.models.trust_score_history_user import TrustScoreHistoryUser
from app.models.user import User
from app.models.user_badge import UserBadge
from app.repositories.leaderboard_repo import LeaderboardRepository
from app.repositories.user_repo import UserRepository


class GamificationService:
    """Business logic for gamification rewards and achievements."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)
        self.leaderboard_repo = LeaderboardRepository(session)

    async def award_xp(self, user: User, points: int) -> dict:
        """Award XP points to a student and calculate level progression."""
        current_points = getattr(user, "total_points", 0) + points
        setattr(user, "total_points", current_points)

        # Level formula: level = floor(sqrt(points / 100)) + 1
        level = math.floor(math.sqrt(current_points / 100)) + 1

        await self.user_repo.update(user, {"trust_score": user.trust_score})
        return {
            "total_points": current_points,
            "points_awarded": points,
            "level": level,
        }

    async def update_trust_score(
        self,
        user: User,
        is_approved: bool,
        confidence_score: float,
    ) -> float:
        """Recalculate and update user trust score and record audit history."""
        old_score = user.trust_score or 100.0

        if is_approved:
            delta = 1.5 if confidence_score >= 0.85 else 0.5
            reason = f"Verified eco-submission (+{delta} points)"
        else:
            delta = -5.0
            reason = f"Rejected submission ({confidence_score:.2f} confidence)"

        new_score = max(0.0, min(100.0, old_score + delta))
        user.trust_score = new_score

        history = TrustScoreHistoryUser(
            user_id=user.user_id,
            score_change=delta,
            reason=reason,
        )
        self.session.add(history)

        return new_score

    async def evaluate_and_award_badges(self, user: User, total_submissions: int) -> list[Badge]:
        """Check badge criteria and save newly unlocked achievements."""
        stmt = select(Badge)
        result = await self.session.execute(stmt)
        all_badges = list(result.scalars().all())

        unlocked_badges = []
        for badge in all_badges:
            if total_submissions >= getattr(badge, "required_count", 1):
                stmt_has = select(UserBadge).where(
                    UserBadge.user_id == user.user_id,
                    UserBadge.badge_id == badge.badge_id,
                )
                res_has = await self.session.execute(stmt_has)
                if not res_has.scalar_one_or_none():
                    user_badge = UserBadge(user_id=user.user_id, badge_id=badge.badge_id)
                    self.session.add(user_badge)
                    unlocked_badges.append(badge)

        return unlocked_badges

    async def update_leaderboard(self, user: User, points_awarded: int) -> None:
        """Update leaderboard standing for student."""
        entry = await self.leaderboard_repo.get_rank_for_user(user.user_id)
        if entry:
            entry.total_points += points_awarded
            await self.leaderboard_repo.update(entry, {"total_points": entry.total_points})

    async def process_all_rewards(
        self,
        user: User,
        points_awarded: int,
        is_approved: bool,
        confidence_score: float,
        total_submissions: int,
    ) -> dict:
        """Atomic helper to orchestrate all gamification rewards for a submission."""
        xp_result = await self.award_xp(user, points_awarded) if is_approved else {"total_points": getattr(user, "total_points", 0), "points_awarded": 0, "level": 1}
        new_trust_score = await self.update_trust_score(user, is_approved=is_approved, confidence_score=confidence_score)
        unlocked_badges = await self.evaluate_and_award_badges(user, total_submissions) if is_approved else []
        if is_approved:
            await self.update_leaderboard(user, points_awarded)

        return {
            "xp": xp_result,
            "trust_score": new_trust_score,
            "unlocked_badges": unlocked_badges,
        }

    async def get_user_stats(self, user: User) -> dict:
        """Get gamification stats for a user."""
        stmt_badges = select(UserBadge).where(UserBadge.user_id == user.user_id)
        res_badges = await self.session.execute(stmt_badges)
        user_badges = list(res_badges.scalars().all())

        return {
            "user_id": str(user.user_id),
            "trust_score": user.trust_score,
            "badges_count": len(user_badges),
        }
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
