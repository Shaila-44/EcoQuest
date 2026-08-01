from __future__ import annotations

"""EcoQuest API — Submission Schemas."""

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


from app.models.enums import SubmissionStatus


class SubmissionCreate(BaseModel):
    """Schema for creating a new submission."""

    challenge_id: uuid.UUID
    title: str
    description: Optional[str] = None
    image_url: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class SubmissionRead(BaseModel):
    """Schema for reading a submission (public response)."""

    submission_id: uuid.UUID
    user_id: uuid.UUID
    challenge_id: uuid.UUID
    title: str
    description: Optional[str] = None
    image_url: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: SubmissionStatus
    points_earned: int
    submitted_at: datetime


    model_config = {"from_attributes": True}
