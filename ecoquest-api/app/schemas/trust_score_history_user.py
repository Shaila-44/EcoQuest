"""EcoQuest API — Trust Score History User Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class TrustScoreHistoryUserBase(BaseModel):
    score: float
    reason: str


class TrustScoreHistoryUserCreate(TrustScoreHistoryUserBase):
    user_id: uuid.UUID


class TrustScoreHistoryUserResponse(TrustScoreHistoryUserBase):
    id: uuid.UUID
    user_id: uuid.UUID
    recorded_at: datetime

    model_config = ConfigDict(from_attributes=True)
