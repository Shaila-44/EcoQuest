"""EcoQuest API — Gamification Routes."""

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/badges")
async def list_all_badges(
    current_user: User = Depends(get_current_user),
) -> dict:
    """List all available badges."""
    # TODO: Implement
    return {"message": "Badges list endpoint — not yet implemented"}


@router.get("/badges/me")
async def get_my_badges(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get badges earned by the current user."""
    # TODO: Implement
    return {"message": "My badges endpoint — not yet implemented"}


@router.get("/stats/me")
async def get_my_stats(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get gamification stats for the current user."""
    # TODO: Implement
    return {"message": "My stats endpoint — not yet implemented"}


@router.get("/levels")
async def get_level_thresholds(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get all level thresholds and titles."""
    # TODO: Implement
    return {"message": "Levels endpoint — not yet implemented"}
