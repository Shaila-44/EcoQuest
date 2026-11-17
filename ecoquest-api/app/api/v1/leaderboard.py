from __future__ import annotations

"""EcoQuest API — Leaderboard Routes."""

import uuid
from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.leaderboard import LeaderboardRead
from app.services.leaderboard_service import LeaderboardService


router = APIRouter()


@router.get("", response_model=list[LeaderboardRead], status_code=200)
async def get_overall_leaderboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[LeaderboardRead]:
    """Get the overall top student leaderboard."""
    service = LeaderboardService(db)
    entries = await service.get_overall_leaderboard()
    return [LeaderboardRead.model_validate(e) for e in entries]


@router.get("/school/{school_id}", response_model=list[LeaderboardRead], status_code=200)
async def get_school_leaderboard(
    school_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[LeaderboardRead]:
    """Get the leaderboard for a specific school."""
    service = LeaderboardService(db)
    entries = await service.get_school_leaderboard(school_id)
    return [LeaderboardRead.model_validate(e) for e in entries]


@router.get("/me", response_model=Optional[LeaderboardRead], status_code=200)
async def get_my_rank(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Optional[LeaderboardRead]:
    """Get the current user's rank."""
    service = LeaderboardService(db)
    entry = await service.get_user_rank(current_user.user_id)
    if not entry:
        return None
    return LeaderboardRead.model_validate(entry)
