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
