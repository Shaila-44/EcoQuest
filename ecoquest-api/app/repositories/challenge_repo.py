"""EcoQuest API — Challenge Repository."""

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.challenge import Challenge
from app.repositories.base import BaseRepository


class ChallengeRepository(BaseRepository[Challenge]):
    """Data access layer for Challenge operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(Challenge, session)

    # TODO: Add custom queries:
    # - get_active_by_school(school_id)
    # - get_daily_challenge(school_id)
    # - get_with_submission_count(challenge_id)
