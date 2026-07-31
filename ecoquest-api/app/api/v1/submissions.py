"""EcoQuest API — Submission Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.submission import SubmissionCreate

router = APIRouter()


@router.post("", status_code=201)
async def create_submission(
    data: SubmissionCreate,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Create a new submission (student only)."""
    # TODO: Implement with RBAC check + AI pipeline trigger
    return {"message": "Submission create endpoint — not yet implemented"}


@router.get("")
async def list_submissions(
    current_user: User = Depends(get_current_user),
) -> dict:
    """List submissions (scoped by role)."""
    # TODO: Implement with role-based scoping
    return {"message": "Submission list endpoint — not yet implemented"}


@router.get("/{submission_id}")
async def get_submission(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get a specific submission's details + AI result."""
    # TODO: Implement with access check
    return {"message": "Submission detail endpoint — not yet implemented"}


@router.delete("/{submission_id}", status_code=204)
async def cancel_submission(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> None:
    """Cancel a pending submission."""
    # TODO: Implement with ownership check
    pass
