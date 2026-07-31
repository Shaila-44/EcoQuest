"""EcoQuest API — AI Verification Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.models.enums import VerificationStatus


class AIVerificationBase(BaseModel):
    status: VerificationStatus
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    raw_response: dict = Field(default_factory=dict, description="Raw JSON from Gemini")
    feedback: str | None = None


class AIVerificationCreate(AIVerificationBase):
    submission_id: uuid.UUID
    verified_by: uuid.UUID | None = None


class AIVerificationUpdate(BaseModel):
    status: VerificationStatus | None = None
    feedback: str | None = None


class AIVerificationResponse(AIVerificationBase):
    verification_id: uuid.UUID
    submission_id: uuid.UUID
    verified_by: uuid.UUID | None
    verified_at: datetime

    model_config = ConfigDict(from_attributes=True)
