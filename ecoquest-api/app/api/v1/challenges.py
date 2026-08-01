from __future__ import annotations

"""EcoQuest API — Challenge Routes."""

import uuid
from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.permissions import require_role
from app.db.session import get_db
from app.models.enums import RoleName
from app.models.user import User
from app.schemas.challenge import ChallengeCreate, ChallengeRead, ChallengeUpdate
from app.schemas.submission import SubmissionRead
from app.services.challenge_service import ChallengeService
from app.services.submission_service import SubmissionService

router = APIRouter()

TEACHER_ADMIN_ROLES = [RoleName.TEACHER, RoleName.SCHOOL_ADMIN, RoleName.SUPER_ADMIN]

@router.get("", response_model=list[ChallengeRead], status_code=200)
async def list_challenges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[ChallengeRead]:
    """List active challenges for the current user's school."""
    service = ChallengeService(db)
    challenges = await service.list_challenges(school_id=current_user.school_id)
    return [ChallengeRead.model_validate(c) for c in challenges]


@router.get("/daily", response_model=Optional[ChallengeRead], status_code=200)
async def get_daily_challenge(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead | None:
    """Get today's challenge for the current user."""
    service = ChallengeService(db)
    c = await service.get_daily_challenge(school_id=current_user.school_id)
    if not c:
        return None
    return ChallengeRead.model_validate(c)


@router.get("/{challenge_id}", response_model=ChallengeRead, status_code=200)

async def get_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead:
    """Get a specific challenge's details."""
    service = ChallengeService(db)
    c = await service.get_challenge(challenge_id)
    return ChallengeRead.model_validate(c)


@router.post("", status_code=201, response_model=ChallengeRead)
async def create_challenge(
    data: ChallengeCreate,
    current_user: User = Depends(require_role(TEACHER_ADMIN_ROLES)),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead:
    """Create a new challenge."""
    service = ChallengeService(db)
    c = await service.create_challenge(data, current_user)
    return ChallengeRead.model_validate(c)


@router.put("/{challenge_id}", response_model=ChallengeRead, status_code=200)
async def update_challenge(
    challenge_id: uuid.UUID,
    data: ChallengeUpdate,
    current_user: User = Depends(require_role(TEACHER_ADMIN_ROLES)),
    db: AsyncSession = Depends(get_db),
) -> ChallengeRead:
    """Update an existing challenge."""
    service = ChallengeService(db)
    c = await service.update_challenge(challenge_id, data, current_user)
    return ChallengeRead.model_validate(c)

@router.delete("/{challenge_id}", status_code=204)
async def delete_challenge(
    challenge_id: uuid.UUID,
    current_user: User = Depends(require_role(TEACHER_ADMIN_ROLES)),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Archive or delete a challenge."""
    service = ChallengeService(db)
    await service.delete_challenge(challenge_id, current_user)


@router.get("/{challenge_id}/submissions", response_model=list[SubmissionRead], status_code=200)
async def list_challenge_submissions(
    challenge_id: uuid.UUID,
    current_user: User = Depends(require_role(TEACHER_ADMIN_ROLES)),
    db: AsyncSession = Depends(get_db),
) -> list[SubmissionRead]:
    """List submissions for a specific challenge (teacher/admin)."""
    service = SubmissionService(db)
    return await service.list_student_submissions(current_user.user_id, challenge_id)
