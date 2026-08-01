from __future__ import annotations

"""EcoQuest API — Challenge Routes."""

import uuid
from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.challenge import ChallengeCreate, ChallengeRead, ChallengeUpdate
from app.services.challenge_service import ChallengeService

router = APIRouter()


@router.get("", response_model=list[ChallengeRead])
async def list_challenges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List active challenges for the current user's school."""
    service = ChallengeService(db)
    challenges = await service.list_challenges(school_id=current_user.school_id)
    return [
        ChallengeRead(
            id=c.challenge_id,
            title=c.title,
            description=c.description or "",
            category=c.category,
            status="active",
            points=c.points,
            created_by=c.created_by,
            school_id=c.school_id,
            starts_at=c.start_date,
            ends_at=c.end_date,
            max_submissions=1,
            created_at=c.created_at,
        )
        for c in challenges
    ]


@router.get("/daily", response_model=Optional[ChallengeRead])
async def get_daily_challenge(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):

    """Get today's challenge for the current user."""
    service = ChallengeService(db)
    c = await service.get_daily_challenge(school_id=current_user.school_id)
    if not c:
        return None
    return ChallengeRead(
        id=c.challenge_id,
        title=c.title,
        description=c.description or "",
        category=c.category,
        status="active",
        points=c.points,
        created_by=c.created_by,
        school_id=c.school_id,
        starts_at=c.start_date,
        ends_at=c.end_date,
        max_submissions=1,
        created_at=c.created_at,
    )


@router.get("/{challenge_id}", response_model=ChallengeRead)
async def get_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a specific challenge's details."""
    service = ChallengeService(db)
    c = await service.get_challenge(challenge_id)
    return ChallengeRead(
        id=c.challenge_id,
        title=c.title,
        description=c.description or "",
        category=c.category,
        status="active",
        points=c.points,
        created_by=c.created_by,
        school_id=c.school_id,
        starts_at=c.start_date,
        ends_at=c.end_date,
        max_submissions=1,
        created_at=c.created_at,
    )


@router.post("", status_code=201, response_model=ChallengeRead)
async def create_challenge(
    data: ChallengeCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new challenge."""
    service = ChallengeService(db)
    c = await service.create_challenge(data, current_user)
    return ChallengeRead(
        id=c.challenge_id,
        title=c.title,
        description=c.description or "",
        category=c.category,
        status="active",
        points=c.points,
        created_by=c.created_by,
        school_id=c.school_id,
        starts_at=c.start_date,
        ends_at=c.end_date,
        max_submissions=1,
        created_at=c.created_at,
    )


@router.put("/{challenge_id}", response_model=ChallengeRead)
async def update_challenge(
    challenge_id: uuid.UUID,
    data: ChallengeUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update an existing challenge."""
    service = ChallengeService(db)
    c = await service.update_challenge(challenge_id, data, current_user)
    return ChallengeRead(
        id=c.challenge_id,
        title=c.title,
        description=c.description or "",
        category=c.category,
        status="active",
        points=c.points,
        created_by=c.created_by,
        school_id=c.school_id,
        starts_at=c.start_date,
        ends_at=c.end_date,
        max_submissions=1,
        created_at=c.created_at,
    )


@router.delete("/{challenge_id}", status_code=204)
async def delete_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Archive or delete a challenge."""
    service = ChallengeService(db)
    await service.delete_challenge(challenge_id, current_user)
