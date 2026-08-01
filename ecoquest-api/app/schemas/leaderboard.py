"""EcoQuest API — Leaderboard Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel


class LeaderboardRead(BaseModel):
    """Schema for a single leaderboard entry."""

    user_id: uuid.UUID
    total_points: int
    global_rank: int | None = None
    category_rank: int | None = None
    updated_at: datetime

    model_config = {"from_attributes": True}


class LeaderboardEntryRead(BaseModel):
    """Schema for a formatted leaderboard entry response."""

    rank: int
    student_id: uuid.UUID
    student_name: str
    avatar_url: str | None = None
    points: int
    school_name: str | None = None
