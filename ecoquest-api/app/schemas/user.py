"""EcoQuest API — User Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr


from app.models.enums import UserStatus


class UserCreate(BaseModel):
    """Schema for creating a user (internal use)."""

    email: EmailStr
    password_hash: str
    name: str
    role_id: uuid.UUID
    school_id: uuid.UUID


class UserRead(BaseModel):
    """Schema for reading a user (public response)."""

    user_id: uuid.UUID
    school_id: uuid.UUID
    role_id: uuid.UUID
    name: str
    # Do not expose encrypted emails or hashes directly in public read unless strictly needed
    profile_image: str | None = None
    status: UserStatus
    trust_score: float
    created_at: datetime
    updated_at: datetime | None = None

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    """Schema for updating a user profile."""

    name: str | None = None
    profile_image: str | None = None
