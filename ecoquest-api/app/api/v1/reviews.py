"""EcoQuest API — Review Routes."""

import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewRead
from app.schemas.submission import SubmissionRead
from app.services.review_service import ReviewService

router = APIRouter()


@router.get("/pending", response_model=list[SubmissionRead])
async def list_pending_reviews(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List submissions awaiting teacher review."""
    service = ReviewService(db)
    pending_submissions = await service.get_pending_reviews(current_user.school_id)
    return [
        SubmissionRead(
            id=sub.submission_id,
            student_id=sub.user_id,
            challenge_id=sub.challenge_id,
            image_url=sub.image_url,
            description=sub.description,
            status=sub.status.value if hasattr(sub.status, "value") else str(sub.status),
            ai_result=None,
            points_awarded=sub.points_earned,
            submitted_at=sub.submitted_at,
            created_at=sub.submitted_at,
        )
        for sub in pending_submissions
    ]


@router.post("", status_code=201, response_model=ReviewRead)
async def create_review(
    data: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit a teacher review decision."""
    service = ReviewService(db)
    rev = await service.create_review(data, current_user)
    return ReviewRead(
        id=rev.review_id,
        submission_id=rev.submission_id,
        reviewer_id=rev.reviewer_id,
        status=rev.status,
        feedback=rev.comment,
        points_awarded=data.points_override or 10,
        created_at=rev.created_at,
    )


@router.get("/{submission_id}", response_model=list[ReviewRead])
async def get_review_history(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get review history for a submission."""
    service = ReviewService(db)
    history = await service.get_review_history(submission_id)
    return [
        ReviewRead(
            id=r.review_id,
            submission_id=r.submission_id,
            reviewer_id=r.reviewer_id,
            status=r.status,
            feedback=r.comment,
            points_awarded=10,
            created_at=r.created_at,
        )
        for r in history
    ]
