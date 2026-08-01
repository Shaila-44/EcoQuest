"""EcoQuest API — Gamification Routes."""

import math

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.repositories.leaderboard_repo import LeaderboardRepository
from app.services.gamification_service import GamificationService

router = APIRouter()


@router.get("/badges", status_code=200)
async def list_all_badges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all available badges."""
    return [
        {"id": "b1", "name": "Tree Planter", "description": "Planted your first tree", "icon_url": "/badges/tree.png"},
        {"id": "b2", "name": "Eco Warrior", "description": "Completed 10 environmental challenges", "icon_url": "/badges/warrior.png"},
        {"id": "b3", "name": "Recycling Hero", "description": "Recycled plastic or paper", "icon_url": "/badges/recycle.png"},
    ]


@router.get("/badges/me", status_code=200)
async def get_my_badges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get badges earned by the current user."""
    service = GamificationService(db)
    stats = await service.get_user_stats(current_user)
    return {
        "user_id": str(current_user.user_id),
        "earned_badges_count": stats.get("badges_count", 0),
        "badges": [],
    }


@router.get("/stats/me", status_code=200)
async def get_my_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get gamification stats for the current user."""
    service = GamificationService(db)
    stats = await service.get_user_stats(current_user)

    leaderboard_repo = LeaderboardRepository(db)
    entry = await leaderboard_repo.get_rank_for_user(current_user.user_id)
    total_points = entry.total_points if entry else 0
    level = math.floor(math.sqrt(total_points / 100)) + 1

    return {
        "user_id": str(current_user.user_id),
        "trust_score": current_user.trust_score,
        "total_points": total_points,
        "level": level,
        "badges_count": stats.get("badges_count", 0),
    }


@router.get("/levels", status_code=200)
async def get_level_thresholds(
    current_user: User = Depends(get_current_user),
):
    """Get all level thresholds and titles."""
    return [
        {"level": 1, "title": "Eco Seedling", "xp_required": 0},
        {"level": 2, "title": "Eco Sprout", "xp_required": 100},
        {"level": 3, "title": "Eco Sapling", "xp_required": 400},
        {"level": 4, "title": "Eco Guardian", "xp_required": 900},
        {"level": 5, "title": "Eco Master", "xp_required": 1600},
    ]
