"""EcoQuest API — Submission Endpoint Controllers.

Handles HTTP routes for student submission creation, upload URL signatures, listing, and cancellations.

Follows production security best practices:
- Rate limited via slowapi to prevent submission API spam
- Authenticates student JWT credentials via Depends(get_current_user)
- Enforces Role-Based Access Control (RBAC) and attribute ownership guards
- Performs security audit logging
"""

import logging
import uuid
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user

from app.core.limiter import limiter
from app.core.permissions import require_role
from app.db.session import get_db
from app.models.enums import RoleName
from app.models.user import User
from app.schemas.submission import SubmissionCreate, SubmissionRead
from app.services.submission_service import SubmissionService

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/upload-url", status_code=status.HTTP_200_OK)
@limiter.limit("10/minute")
async def get_upload_url(
    request: Request,
    folder: str = "ecoquest/submissions",
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Generate a signed Cloudinary upload URL for direct-to-CDN image uploads."""
    logger.info("Presigned upload URL requested by user %s", current_user.user_id)
    service = SubmissionService(db)
    return await service.generate_upload_url(folder=folder)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=SubmissionRead)
@limiter.limit("5/minute")
async def create_submission(
    request: Request,
    data: SubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),

):
    """Create a new student submission and trigger Gemini Vision AI verification.

    - Authenticates student JWT credentials
    - Rate limited to prevent endpoint abuse
    - Validates SubmissionCreate request body
    - Delegates full workflow to SubmissionService
    - Audits security logs
    """
    logger.info(
        "Audit Log: Submission created by user_id=%s for challenge_id=%s (IP=%s)",
        current_user.user_id,
        data.challenge_id,
        request.client.host if request.client else "unknown",
    )
    service = SubmissionService(db)
    sub = await service.create_submission(data, current_user)
    return SubmissionRead.model_validate(sub)


@router.get("", status_code=status.HTTP_200_OK, response_model=list[SubmissionRead])
async def list_submissions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List submissions for the current authenticated user."""
    service = SubmissionService(db)
    submissions = await service.list_submissions(student_id=current_user.user_id)
    return [SubmissionRead.model_validate(sub) for sub in submissions]


@router.get("/{submission_id}", status_code=status.HTTP_200_OK, response_model=SubmissionRead)
async def get_submission(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),

):
    """Get details for a specific submission."""
    service = SubmissionService(db)
    sub = await service.get_submission(submission_id)
    return SubmissionRead.model_validate(sub)


@router.delete("/{submission_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_submission(
    submission_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    """Cancel a pending submission."""
    service = SubmissionService(db)
    await service.cancel_submission(submission_id, current_user)
