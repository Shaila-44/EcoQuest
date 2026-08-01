"""EcoQuest API — Review Service.

Handles teacher review workflow: approve, reject, request resubmission.
"""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import SubmissionStatus
from app.models.review import Review
from app.repositories.review_repo import ReviewRepository
from app.repositories.submission_repo import SubmissionRepository
from app.schemas.review import ReviewCreate, ReviewRead
from app.core.exceptions import NotFoundError, ValidationError


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
        
        # Side effects
        sub_repo = SubmissionRepository(self.session)
        submission = await sub_repo.get_by_id(data.submission_id)
        if not submission:
            raise NotFoundError("Submission", str(data.submission_id))

        if data.decision.lower() == "approved":
            submission.status = SubmissionStatus.APPROVED
            
            # Use override points or fallback to default 0 if not calculated yet
            final_points = data.points_override if data.points_override is not None else submission.points_earned
            submission.points_earned = final_points
            
            from app.services.gamification_service import GamificationService
            gamification = GamificationService(self.session)
            await gamification.award_points(submission.user_id, final_points)
        elif data.decision.lower() == "rejected":
            submission.status = SubmissionStatus.REJECTED
        else:
            raise ValidationError("Invalid decision format, must be approved or rejected", {"decision": data.decision})

        await sub_repo.update(submission, {
            "status": submission.status,
            "points_earned": submission.points_earned
        })
        
        return ReviewRead.model_validate(created_review)

    async def get_review_history(self, submission_id: uuid.UUID) -> list[ReviewRead]:
        """Get the review history for a submission."""
        repo = ReviewRepository(self.session)
        reviews = await repo.get_by_submission(submission_id)
        return [ReviewRead.model_validate(r) for r in reviews]
