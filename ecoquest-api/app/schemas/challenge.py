from __future__ import annotations

"""EcoQuest API — Challenge Schemas."""

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ChallengeCreate(BaseModel):
    """Schema for creating a new challenge."""

    title: str
    description: Optional[str] = None
    category: str
    points: int = 0
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class ChallengeRead(BaseModel):
    """Schema for reading a challenge (public response)."""

    challenge_id: uuid.UUID
    school_id: uuid.UUID
    created_by: uuid.UUID
    title: str
    description: Optional[str] = None
    category: str
    points: int
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ChallengeUpdate(BaseModel):
    """Schema for updating a challenge."""

    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    points: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

