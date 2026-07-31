"""EcoQuest API — School Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.common import TimestampSchema


class SchoolBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    address: str = Field(..., min_length=5, max_length=255)
    city: str = Field(..., min_length=2, max_length=100)
    state: str = Field(..., min_length=2, max_length=100)
    country: str = Field(..., min_length=2, max_length=100)
    postal_code: str = Field(..., min_length=2, max_length=20)
    contact_email: str | None = None
    contact_phone: str | None = None


class SchoolCreate(SchoolBase):
    pass


class SchoolUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=150)
    address: str | None = Field(None, min_length=5, max_length=255)
    city: str | None = Field(None, min_length=2, max_length=100)
    state: str | None = Field(None, min_length=2, max_length=100)
    country: str | None = Field(None, min_length=2, max_length=100)
    postal_code: str | None = Field(None, min_length=2, max_length=20)
    contact_email: str | None = None
    contact_phone: str | None = None
    is_active: bool | None = None


class SchoolResponse(SchoolBase, TimestampSchema):
    school_id: uuid.UUID
    school_code: str
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
