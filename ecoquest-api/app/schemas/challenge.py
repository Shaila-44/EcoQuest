"""EcoQuest API — Challenge Schemas."""

import uuid
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.common import TimestampSchema


class ChallengeBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=150)
    description: str = Field(..., min_length=10)
    category: str = Field(..., max_length=50)
    points_reward: int = Field(..., ge=0)
    is_active: bool = True
    ai_prompt: str | None = Field(None, description="Internal prompt for Gemini")


class ChallengeCreate(ChallengeBase):
    created_by: uuid.UUID


class ChallengeUpdate(BaseModel):
    title: str | None = Field(None, min_length=5, max_length=150)
    description: str | None = Field(None, min_length=10)
    category: str | None = Field(None, max_length=50)
    points_reward: int | None = Field(None, ge=0)
    is_active: bool | None = None
    ai_prompt: str | None = None


class ChallengeResponse(ChallengeBase, TimestampSchema):
    challenge_id: uuid.UUID
    created_by: uuid.UUID

    model_config = ConfigDict(from_attributes=True)
