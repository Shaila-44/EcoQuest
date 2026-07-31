"""EcoQuest API — School Trust Score Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class SchoolTrustScoreBase(BaseModel):
    trust_score: float = Field(default=100.0)


class SchoolTrustScoreCreate(SchoolTrustScoreBase):
    school_id: uuid.UUID


class SchoolTrustScoreUpdate(BaseModel):
    trust_score: float | None = None


class SchoolTrustScoreResponse(SchoolTrustScoreBase):
    id: uuid.UUID
    school_id: uuid.UUID
    last_updated: datetime

    model_config = ConfigDict(from_attributes=True)
