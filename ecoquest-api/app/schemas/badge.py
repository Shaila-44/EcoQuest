"""EcoQuest API — Badge Schemas."""

import uuid
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.common import TimestampSchema


class BadgeBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: str
    icon_url: str
    points_required: int = Field(..., ge=0)


class BadgeCreate(BadgeBase):
    pass


class BadgeUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=100)
    description: str | None = None
    icon_url: str | None = None
    points_required: int | None = Field(None, ge=0)


class BadgeResponse(BadgeBase, TimestampSchema):
    badge_id: uuid.UUID

    model_config = ConfigDict(from_attributes=True)
