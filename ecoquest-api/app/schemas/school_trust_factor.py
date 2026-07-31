"""EcoQuest API — School Trust Factor Schemas."""

import uuid
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.common import TimestampSchema


class SchoolTrustFactorBase(BaseModel):
    factor_name: str = Field(..., max_length=100)
    description: str | None = None
    weight: float = Field(default=1.0)
    value: float


class SchoolTrustFactorCreate(SchoolTrustFactorBase):
    school_id: uuid.UUID


class SchoolTrustFactorUpdate(BaseModel):
    factor_name: str | None = Field(None, max_length=100)
    description: str | None = None
    weight: float | None = None
    value: float | None = None


class SchoolTrustFactorResponse(SchoolTrustFactorBase, TimestampSchema):
    factor_id: uuid.UUID
    school_id: uuid.UUID

    model_config = ConfigDict(from_attributes=True)
