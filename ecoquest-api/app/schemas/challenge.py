from __future__ import annotations

"""EcoQuest API — Challenge Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel


class ChallengeCreate(BaseModel):
    """Schema for creating a new challenge."""

    title: str
    description: str | None = None
    category: str
    points: int = 0
    start_date: datetime | None = None
    end_date: datetime | None = None


class ChallengeRead(BaseModel):
    """Schema for reading a challenge (public response)."""

    challenge_id: uuid.UUID
    school_id: uuid.UUID
    created_by: uuid.UUID
    title: str
    description: str | None = None
    category: str
    points: int
    start_date: datetime | None = None
    end_date: datetime | None = None
    created_at: datetime
    updated_at: datetime | None = None

    model_config = {"from_attributes": True}


class ChallengeUpdate(BaseModel):
    """Schema for updating a challenge."""

    title: str | None = None
    description: str | None = None
    category: str | None = None
    points: int | None = None
    start_date: datetime | None = None
    end_date: datetime | None = None

