"""EcoQuest API — Review Repository."""

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review
from app.repositories.base import BaseRepository


class ReviewRepository(BaseRepository[Review]):
    """Data access layer for Review operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(Review, session)

    # TODO: Add custom queries:
    # - get_by_submission(submission_id)
    # - get_latest_for_submission(submission_id)
