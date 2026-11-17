from __future__ import annotations

"""EcoQuest API — Review Schemas."""

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ReviewCreate(BaseModel):
    """Schema for creating a review (teacher decision)."""

    submission_id: uuid.UUID
    decision: str  # 'approved', 'rejected', 'needs_resubmission'
    comment: Optional[str] = None
    points_override: Optional[int] = None


class ReviewRead(BaseModel):
    """Schema for reading a review."""

    review_id: uuid.UUID
    submission_id: uuid.UUID
    reviewer_id: uuid.UUID
    decision: str
    comment: Optional[str] = None
    points_override: Optional[int] = None
    reviewed_at: datetime

    created_at: datetime

    model_config = {"from_attributes": True}
