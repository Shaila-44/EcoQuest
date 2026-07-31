"""EcoQuest API — Submission Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.models.enums import SubmissionStatus


class SubmissionBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=150)
    description: str | None = None
    image_url: str = Field(..., description="Cloudinary or Storage URL")
    latitude: float | None = Field(None, ge=-90.0, le=90.0)
    longitude: float | None = Field(None, ge=-180.0, le=180.0)


class SubmissionCreate(SubmissionBase):
    user_id: uuid.UUID
    challenge_id: uuid.UUID


class SubmissionUpdate(BaseModel):
    title: str | None = Field(None, min_length=2, max_length=150)
    description: str | None = None
    status: SubmissionStatus | None = None
    points_earned: int | None = Field(None, ge=0)


class SubmissionResponse(SubmissionBase):
    submission_id: uuid.UUID
    user_id: uuid.UUID
    challenge_id: uuid.UUID
    status: SubmissionStatus
    points_earned: int
    submitted_at: datetime

    model_config = ConfigDict(from_attributes=True)
