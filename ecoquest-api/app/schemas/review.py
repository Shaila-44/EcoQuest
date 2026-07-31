"""EcoQuest API — Review Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel


class ReviewCreate(BaseModel):
    """Schema for creating a review (teacher decision)."""

    submission_id: uuid.UUID
    decision: str  # 'approved', 'rejected', 'needs_resubmission'
    comment: str | None = None
    points_override: int | None = None


class ReviewRead(BaseModel):
    """Schema for reading a review."""

    id: uuid.UUID
    submission_id: uuid.UUID
    reviewer_id: uuid.UUID
    decision: str
    comment: str | None = None
    points_override: int | None = None
    reviewed_at: datetime
    created_at: datetime

    model_config = {"from_attributes": True}
