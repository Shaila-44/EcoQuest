"""EcoQuest API — Trust Score History School Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class TrustScoreHistorySchoolBase(BaseModel):
    score: float
    reason: str


class TrustScoreHistorySchoolCreate(TrustScoreHistorySchoolBase):
    school_id: uuid.UUID


class TrustScoreHistorySchoolResponse(TrustScoreHistorySchoolBase):
    id: uuid.UUID
    school_id: uuid.UUID
    recorded_at: datetime

    model_config = ConfigDict(from_attributes=True)
