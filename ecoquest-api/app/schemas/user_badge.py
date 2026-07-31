"""EcoQuest API — User Badge Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class UserBadgeBase(BaseModel):
    points_earned: int = Field(default=0, ge=0)


class UserBadgeCreate(UserBadgeBase):
    user_id: uuid.UUID
    badge_id: uuid.UUID


class UserBadgeResponse(UserBadgeBase):
    id: uuid.UUID
    user_id: uuid.UUID
    badge_id: uuid.UUID
    earned_date: datetime

    model_config = ConfigDict(from_attributes=True)
