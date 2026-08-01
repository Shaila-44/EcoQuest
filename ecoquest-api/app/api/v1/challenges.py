"""EcoQuest API — Challenge Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.challenge import ChallengeCreate, ChallengeRead, ChallengeUpdate
from app.schemas.submission import SubmissionRead
from app.services.challenge_service import ChallengeService
from app.services.submission_service import SubmissionService
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("", response_model=list[ChallengeRead], status_code=200)
async def list_challenges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[ChallengeRead]:
    """List active challenges (filtered by school, category, status)."""
    service = ChallengeService(db)
    return await service.list_active_challenges(current_user.school_id)


@router.get("/daily", response_model=ChallengeRead, status_code=200)
async def get_daily_challenge(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead:
    """Get today's challenge for the current user."""
    service = ChallengeService(db)
    return await service.get_daily_challenge(current_user.school_id)


@router.get("/{challenge_id}", response_model=ChallengeRead, status_code=200)
async def get_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead:
    """Get a specific challenge's details."""
    service = ChallengeService(db)
    return await service.get_challenge(challenge_id)


@router.post("", response_model=ChallengeRead, status_code=201)
async def create_challenge(
    data: ChallengeCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead:
    """Create a new challenge (teacher/admin only)."""
    service = ChallengeService(db)
    return await service.create_challenge(data, current_user.id, current_user.school_id)


@router.put("/{challenge_id}", response_model=ChallengeRead, status_code=200)
async def update_challenge(
    challenge_id: uuid.UUID,
    data: ChallengeUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead:
    """Update an existing challenge."""
    service = ChallengeService(db)
    return await service.update_challenge(challenge_id, data)


@router.delete("/{challenge_id}", status_code=204)
async def delete_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Archive a challenge (soft delete)."""
    service = ChallengeService(db)
    await service.delete_challenge(challenge_id)


@router.get("/{challenge_id}/submissions", response_model=list[SubmissionRead], status_code=200)
async def list_challenge_submissions(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[SubmissionRead]:
    """List submissions for a specific challenge (teacher/admin)."""
    service = SubmissionService(db)
    return await service.list_student_submissions(current_user.id, challenge_id)
