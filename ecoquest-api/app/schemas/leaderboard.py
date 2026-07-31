"""EcoQuest API — Leaderboard Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class LeaderboardBase(BaseModel):
    total_points: int = Field(default=0, ge=0)
    challenges_completed: int = Field(default=0, ge=0)
    rank: int | None = Field(None, ge=1)


class LeaderboardCreate(LeaderboardBase):
    user_id: uuid.UUID


class LeaderboardUpdate(BaseModel):
    total_points: int | None = Field(None, ge=0)
    challenges_completed: int | None = Field(None, ge=0)
    rank: int | None = Field(None, ge=1)


class LeaderboardResponse(LeaderboardBase):
    id: uuid.UUID
    user_id: uuid.UUID
    last_updated: datetime

    model_config = ConfigDict(from_attributes=True)
