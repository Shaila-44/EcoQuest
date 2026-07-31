"""EcoQuest API — Review Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.review import ReviewCreate

router = APIRouter()


@router.get("/pending")
async def list_pending_reviews(
    current_user: User = Depends(get_current_user),
) -> dict:
    """List submissions awaiting teacher review."""
    # TODO: Implement with RBAC + school scoping
    return {"message": "Pending reviews endpoint — not yet implemented"}


@router.post("", status_code=201)
async def create_review(
    data: ReviewCreate,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Submit a review decision (teacher/admin)."""
    # TODO: Implement with RBAC check
    return {"message": "Review create endpoint — not yet implemented"}


@router.get("/{submission_id}")
async def get_review_history(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get review history for a submission."""
    # TODO: Implement with access check
    return {"message": "Review history endpoint — not yet implemented"}
