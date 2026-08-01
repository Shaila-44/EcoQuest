from __future__ import annotations

"""EcoQuest API — Leaderboard Schemas."""

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class LeaderboardRead(BaseModel):
    """Schema for a single leaderboard entry."""

    user_id: uuid.UUID
    total_points: int
    global_rank: Optional[int] = None
    category_rank: Optional[int] = None
    updated_at: datetime


    model_config = {"from_attributes": True}
