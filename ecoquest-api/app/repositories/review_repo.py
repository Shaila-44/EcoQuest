"""EcoQuest API — Review Repository."""

import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review
from app.repositories.base import BaseRepository


class ReviewRepository(BaseRepository[Review]):
    """Data access layer for Review operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(Review, session)

    async def get_by_submission(self, submission_id: uuid.UUID) -> list[Review]:
        """Get all reviews for a submission."""
        stmt = select(Review).where(Review.submission_id == submission_id).order_by(Review.created_at.desc())
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_latest_for_submission(self, submission_id: uuid.UUID) -> Review | None:
        """Get the most recent review for a submission."""
        stmt = select(Review).where(Review.submission_id == submission_id).order_by(Review.created_at.desc()).limit(1)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
