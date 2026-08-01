"""EcoQuest API — Review Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewRead
from app.services.review_service import ReviewService
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

router = APIRouter()


@router.get("/pending", response_model=list[ReviewRead], status_code=200)
async def list_pending_reviews(
    current_user: User = Depends(get_current_user),
) -> list[ReviewRead]:
    """List submissions awaiting teacher review."""
    raise HTTPException(status_code=501, detail="Not Implemented")


@router.post("", response_model=ReviewRead, status_code=201)
async def create_review(
    data: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ReviewRead:
    """Submit a review decision (teacher/admin)."""
    service = ReviewService(db)
    return await service.create_review(data, current_user.id)


@router.get("/{submission_id}", response_model=list[ReviewRead], status_code=200)
async def get_review_history(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[ReviewRead]:
    """Get review history for a submission."""
    service = ReviewService(db)
    return await service.get_review_history(submission_id)
