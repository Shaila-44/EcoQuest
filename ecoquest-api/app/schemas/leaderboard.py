"""EcoQuest API — Leaderboard Schemas."""

import uuid
from decimal import Decimal

from pydantic import BaseModel


class LeaderboardEntryRead(BaseModel):
    """Schema for a single leaderboard entry."""

    user_id: uuid.UUID
    first_name: str
    last_name: str
    school_id: uuid.UUID | None = None
    school_name: str | None = None
    total_points: int
    level: int
    current_streak: int
    trust_score: Decimal
    overall_rank: int
    school_rank: int

    model_config = {"from_attributes": True}
