"""EcoQuest API — Review Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.common import TimestampSchema


class ReviewBase(BaseModel):
    decision: str = Field(..., max_length=20)
    comment: str | None = None
    points_override: int | None = None


class ReviewCreate(ReviewBase):
    submission_id: uuid.UUID


class ReviewUpdate(BaseModel):
    decision: str | None = Field(None, max_length=20)
    comment: str | None = None
    points_override: int | None = None


class ReviewResponse(ReviewBase, TimestampSchema):
    id: uuid.UUID
    submission_id: uuid.UUID
    reviewer_id: uuid.UUID
    reviewed_at: datetime

    model_config = ConfigDict(from_attributes=True)
