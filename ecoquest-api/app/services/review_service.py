"""EcoQuest API — Review Service.

Handles teacher review workflow: approve, reject, or request resubmission.
"""

import uuid
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import SubmissionStatus
from app.models.review import Review
from app.models.submission import Submission
from app.models.user import User
from app.repositories.review_repo import ReviewRepository
from app.repositories.submission_repo import SubmissionRepository
from app.schemas.review import ReviewCreate
from app.services.gamification_service import GamificationService
from app.services.leaderboard_service import LeaderboardService


class ReviewService:
    """Business logic for teacher review operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.review_repo = ReviewRepository(session)
        self.submission_repo = SubmissionRepository(session)
        self.gamification_service = GamificationService(session)
        self.leaderboard_service = LeaderboardService(session)

    async def create_review(self, data: ReviewCreate, reviewer: User) -> Review:
        """Create a teacher review and update submission status."""
        submission = await self.submission_repo.get_by_id(data.submission_id)
        if not submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Submission not found.",
            )

        new_status = SubmissionStatus.APPROVED if data.status.lower() == "approved" else SubmissionStatus.REJECTED
        submission.status = new_status

        if new_status == SubmissionStatus.APPROVED:
            points = data.points_override if data.points_override is not None else 10
            submission.points_earned = points
            await self.gamification_service.award_points(submission.user, points)
            await self.leaderboard_service.update_leaderboard_entry(
                submission.user_id, submission.user.school_id, points
            )

        await self.submission_repo.update(submission, {"status": new_status, "points_earned": submission.points_earned})

        new_review = Review(
            submission_id=data.submission_id,
            reviewer_id=reviewer.user_id,
            status=data.status,
            comment=data.comment,
        )
        return await self.review_repo.create(new_review)

    async def get_pending_reviews(self, school_id: uuid.UUID) -> list[Submission]:
        """Fetch all submissions awaiting teacher review for a school."""
        return await self.submission_repo.get_pending_for_school(school_id)

    async def get_review_history(self, submission_id: uuid.UUID) -> list[Review]:
        """Get review history for a submission."""
        return await self.review_repo.get_by_submission(submission_id)
