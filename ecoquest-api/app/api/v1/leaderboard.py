"""EcoQuest API — Leaderboard Routes."""

import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.leaderboard import LeaderboardEntryRead
from app.services.leaderboard_service import LeaderboardService

router = APIRouter()


@router.get("", response_model=list[LeaderboardEntryRead])
async def get_overall_leaderboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the overall top student leaderboard."""
    service = LeaderboardService(db)
    entries = await service.get_overall_leaderboard()
    return [
        LeaderboardEntryRead(
            rank=idx + 1,
            student_id=e.user_id,
            student_name=e.user.name if e.user else "Student",
            avatar_url=e.user.profile_image if e.user else None,
            points=e.total_points,
            school_name=e.school.name if e.school else "School",
        )
        for idx, e in enumerate(entries)
    ]


@router.get("/school/{school_id}", response_model=list[LeaderboardEntryRead])
async def get_school_leaderboard(
    school_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the leaderboard for a specific school."""
    service = LeaderboardService(db)
    entries = await service.get_school_leaderboard(school_id)
    return [
        LeaderboardEntryRead(
            rank=idx + 1,
            student_id=e.user_id,
            student_name=e.user.name if e.user else "Student",
            avatar_url=e.user.profile_image if e.user else None,
            points=e.total_points,
            school_name=e.school.name if e.school else "School",
        )
        for idx, e in enumerate(entries)
    ]


@router.get("/me", response_model=LeaderboardEntryRead | None)
async def get_my_rank(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the current user's rank."""
    service = LeaderboardService(db)
    entry = await service.get_user_rank(current_user.user_id)
    if not entry:
        return None
    return LeaderboardEntryRead(
        rank=1,
        student_id=entry.user_id,
        student_name=current_user.name or "Student",
        avatar_url=current_user.profile_image,
        points=entry.total_points,
        school_name=entry.school.name if entry.school else "School",
    )
