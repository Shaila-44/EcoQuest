"""EcoQuest API — Leaderboard Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("")
async def get_overall_leaderboard(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get the overall leaderboard (paginated)."""
    # TODO: Implement with pagination
    return {"message": "Leaderboard endpoint — not yet implemented"}


@router.get("/school/{school_id}")
async def get_school_leaderboard(
    school_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get the leaderboard for a specific school."""
    # TODO: Implement
    return {"message": "School leaderboard endpoint — not yet implemented"}


@router.get("/me")
async def get_my_rank(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get the current user's rank and surrounding ranks."""
    # TODO: Implement
    return {"message": "My rank endpoint — not yet implemented"}
