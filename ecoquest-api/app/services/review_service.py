"""EcoQuest API — Review Service.

Handles teacher review workflow: approve, reject, request resubmission.
"""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.review import Review
from app.repositories.review_repo import ReviewRepository
from app.schemas.review import ReviewCreate, ReviewRead


class ReviewService:
    """Business logic for review operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_review(self, data: ReviewCreate, reviewer_id: uuid.UUID) -> ReviewRead:
        """Create a new review (teacher decision)."""
        repo = ReviewRepository(self.session)
        review = Review(
            submission_id=data.submission_id,
            reviewer_id=reviewer_id,
            decision=data.decision,
            comment=data.comment,
            points_override=data.points_override
        )
        created_review = await repo.create(review)
        return ReviewRead.model_validate(created_review)

    async def get_review_history(self, submission_id: uuid.UUID) -> list[ReviewRead]:
        """Get the review history for a submission."""
        repo = ReviewRepository(self.session)
        reviews = await repo.get_by_submission(submission_id)
        return [ReviewRead.model_validate(r) for r in reviews]
