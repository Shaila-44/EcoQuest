"""EcoQuest API — Submission Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.submission import SubmissionCreate, SubmissionRead
from app.services.submission_service import SubmissionService
from app.pipeline.orchestrator import PipelineOrchestrator
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

router = APIRouter()


@router.post("", response_model=SubmissionRead, status_code=201)
async def create_submission(
    data: SubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> SubmissionRead:
    """Create a new submission (student only)."""
    service = SubmissionService(db)
    # Using a simple instance of PipelineOrchestrator here.
    return await service.create_submission(data, current_user.id, PipelineOrchestrator())


@router.get("", response_model=list[SubmissionRead], status_code=200)
async def list_submissions(
    current_user: User = Depends(get_current_user),
) -> list[SubmissionRead]:
    """List submissions (scoped by role)."""
    raise HTTPException(status_code=501, detail="Not Implemented")


@router.get("/{submission_id}", response_model=SubmissionRead, status_code=200)
async def get_submission(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> SubmissionRead:
    """Get a specific submission's details + AI result."""
    service = SubmissionService(db)
    submission = await service.get_submission(submission_id)
    if not submission:
        from app.core.exceptions import NotFoundError
        raise NotFoundError("Submission", str(submission_id))
    return submission


@router.delete("/{submission_id}", status_code=204)
async def cancel_submission(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Cancel a pending submission."""
    service = SubmissionService(db)
    await service.cancel_submission(submission_id, current_user.id)
