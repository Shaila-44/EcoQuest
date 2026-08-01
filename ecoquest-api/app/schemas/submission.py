from __future__ import annotations

"""EcoQuest API — Submission Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel

from app.models.enums import SubmissionStatus


class SubmissionCreate(BaseModel):
    """Schema for creating a new submission."""

    challenge_id: uuid.UUID
    title: str
    description: str | None = None
    image_url: str
    latitude: float | None = None
    longitude: float | None = None


class SubmissionRead(BaseModel):
    """Schema for reading a submission (public response)."""

    submission_id: uuid.UUID
    user_id: uuid.UUID
    challenge_id: uuid.UUID
    title: str
    description: str | None = None
    image_url: str
    latitude: float | None = None
    longitude: float | None = None
    status: SubmissionStatus
    points_earned: int
    submitted_at: datetime


    model_config = {"from_attributes": True}
