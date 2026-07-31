"""EcoQuest API — Challenge Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.challenge import ChallengeCreate, ChallengeUpdate

router = APIRouter()


@router.get("")
async def list_challenges(
    current_user: User = Depends(get_current_user),
) -> dict:
    """List active challenges (filtered by school, category, status)."""
    # TODO: Implement with filters + pagination
    return {"message": "Challenge list endpoint — not yet implemented"}


@router.get("/daily")
async def get_daily_challenge(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get today's challenge for the current user."""
    # TODO: Implement daily challenge selection
    return {"message": "Daily challenge endpoint — not yet implemented"}


@router.get("/{challenge_id}")
async def get_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get a specific challenge's details."""
    # TODO: Implement
    return {"message": "Challenge detail endpoint — not yet implemented"}


@router.post("", status_code=201)
async def create_challenge(
    data: ChallengeCreate,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Create a new challenge (teacher/admin only)."""
    # TODO: Implement with RBAC check
    return {"message": "Challenge create endpoint — not yet implemented"}


@router.put("/{challenge_id}")
async def update_challenge(
    challenge_id: uuid.UUID,
    data: ChallengeUpdate,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Update an existing challenge."""
    # TODO: Implement with ownership check
    return {"message": "Challenge update endpoint — not yet implemented"}


@router.delete("/{challenge_id}", status_code=204)
async def delete_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> None:
    """Archive a challenge (soft delete)."""
    # TODO: Implement with ownership check
    pass


@router.get("/{challenge_id}/submissions")
async def list_challenge_submissions(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> dict:
    """List submissions for a specific challenge (teacher/admin)."""
    # TODO: Implement with RBAC check
    return {"message": "Challenge submissions endpoint — not yet implemented"}
