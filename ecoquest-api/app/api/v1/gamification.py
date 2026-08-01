"""EcoQuest API — Gamification Routes."""

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User
from fastapi import HTTPException

router = APIRouter()


@router.get("/badges", status_code=200)
async def list_all_badges(
    current_user: User = Depends(get_current_user),
) -> dict:
    """List all available badges."""
    raise HTTPException(status_code=501, detail="Not Implemented")


@router.get("/badges/me", status_code=200)
async def get_my_badges(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get badges earned by the current user."""
    raise HTTPException(status_code=501, detail="Not Implemented")


@router.get("/stats/me", status_code=200)
async def get_my_stats(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get gamification stats for the current user."""
    raise HTTPException(status_code=501, detail="Not Implemented")


@router.get("/levels", status_code=200)
async def get_level_thresholds(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get all level thresholds and titles."""
    raise HTTPException(status_code=501, detail="Not Implemented")
