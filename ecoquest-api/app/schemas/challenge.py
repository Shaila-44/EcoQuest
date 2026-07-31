"""EcoQuest API — Challenge Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel


class ChallengeCreate(BaseModel):
    """Schema for creating a new challenge."""

    title: str
    description: str
    instructions: str | None = None
    category: str
    points: int = 10
    difficulty: int | None = None
    school_id: uuid.UUID | None = None
    starts_at: datetime | None = None
    ends_at: datetime | None = None
    max_submissions: int = 1
    verification_prompt: str | None = None
    image_url: str | None = None


class ChallengeRead(BaseModel):
    """Schema for reading a challenge (public response)."""

    id: uuid.UUID
    title: str
    description: str
    instructions: str | None = None
    category: str
    status: str
    points: int
    difficulty: int | None = None
    created_by: uuid.UUID
    school_id: uuid.UUID | None = None
    starts_at: datetime | None = None
    ends_at: datetime | None = None
    max_submissions: int
    image_url: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ChallengeUpdate(BaseModel):
    """Schema for updating a challenge."""

    title: str | None = None
    description: str | None = None
    instructions: str | None = None
    category: str | None = None
    status: str | None = None
    points: int | None = None
    difficulty: int | None = None
    starts_at: datetime | None = None
    ends_at: datetime | None = None
    max_submissions: int | None = None
    verification_prompt: str | None = None
    image_url: str | None = None
