"""EcoQuest API — Leaderboard Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.leaderboard import LeaderboardRead
from app.services.leaderboard_service import LeaderboardService
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

router = APIRouter()


@router.get("", response_model=list[LeaderboardRead], status_code=200)
async def get_overall_leaderboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[LeaderboardRead]:
    """Get the overall leaderboard (paginated)."""
    service = LeaderboardService(db)
    return await service.get_overall_leaderboard(limit=100)


@router.get("/school/{school_id}", response_model=list[LeaderboardRead], status_code=200)
async def get_school_leaderboard(
    school_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[LeaderboardRead]:
    """Get the leaderboard for a specific school."""
    service = LeaderboardService(db)
    return await service.get_school_leaderboard(school_id, limit=100)


@router.get("/me", response_model=LeaderboardRead, status_code=200)
async def get_my_rank(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> LeaderboardRead:
    """Get the current user's rank and surrounding ranks."""
    service = LeaderboardService(db)
    entry = await service.get_user_rank(current_user.id)
    if not entry:
        from app.core.exceptions import NotFoundError
        raise NotFoundError("Leaderboard entry", str(current_user.id))
    return entry
