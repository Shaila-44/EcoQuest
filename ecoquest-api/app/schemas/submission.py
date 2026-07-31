"""EcoQuest API — Submission Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel


class SubmissionCreate(BaseModel):
    """Schema for creating a new submission."""

    challenge_id: uuid.UUID
    image_url: str
    image_public_id: str
    description: str | None = None


class SubmissionRead(BaseModel):
    """Schema for reading a submission (public response)."""

    id: uuid.UUID
    student_id: uuid.UUID
    challenge_id: uuid.UUID
    image_url: str
    description: str | None = None
    status: str
    ai_result: dict | None = None
    points_awarded: int
    submitted_at: datetime
    created_at: datetime

    model_config = {"from_attributes": True}
