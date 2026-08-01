"""EcoQuest API — Review Routes."""

import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user

from app.core.permissions import require_role
from app.db.session import get_db
from app.models.enums import RoleName
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewRead
from app.schemas.submission import SubmissionRead
from app.services.review_service import ReviewService

router = APIRouter()

TEACHER_ADMIN_ROLES = [RoleName.TEACHER, RoleName.SCHOOL_ADMIN, RoleName.SUPER_ADMIN]



@router.get("/pending", response_model=list[SubmissionRead])
async def list_pending_reviews(
    current_user: User = Depends(require_role(TEACHER_ADMIN_ROLES)),
    db: AsyncSession = Depends(get_db),
):
    """List submissions awaiting teacher review."""
    service = ReviewService(db)
    pending_submissions = await service.get_pending_reviews(current_user.school_id)
    return [SubmissionRead.model_validate(sub) for sub in pending_submissions]


@router.post("", status_code=201, response_model=ReviewRead)
async def create_review(
    data: ReviewCreate,
    current_user: User = Depends(require_role(TEACHER_ADMIN_ROLES)),
    db: AsyncSession = Depends(get_db),
):
    """Submit a teacher review decision."""
    service = ReviewService(db)
    rev = await service.create_review(data, current_user)
    return ReviewRead.model_validate(rev)


@router.get("/{submission_id}", response_model=list[ReviewRead])
async def get_review_history(
    submission_id: uuid.UUID,
    current_user: User = Depends(require_role(TEACHER_ADMIN_ROLES)),
    db: AsyncSession = Depends(get_db),
):
    """Get review history for a submission."""
    service = ReviewService(db)
    history = await service.get_review_history(submission_id)
    return [ReviewRead.model_validate(r) for r in history]
