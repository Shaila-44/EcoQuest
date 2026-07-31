"""EcoQuest API — Gamification Schemas."""

import uuid
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class BadgeRead(BaseModel):
    """Schema for reading a badge definition."""

    id: uuid.UUID
    name: str
    description: str
    icon_url: str | None = None
    category: str | None = None
    criteria: dict
    points_bonus: int

    model_config = {"from_attributes": True}


class UserBadgeRead(BaseModel):
    """Schema for a badge earned by a user."""

    badge: BadgeRead
    earned_at: datetime


class UserStatsRead(BaseModel):
    """Schema for reading user gamification stats."""

    total_points: int
    level: int
    current_streak: int
    longest_streak: int
    total_submissions: int
    approved_submissions: int
    trust_score: Decimal

    model_config = {"from_attributes": True}


class LevelInfo(BaseModel):
    """Schema for level threshold information."""

    level: int
    points_required: int
    title: str
