"""EcoQuest API — User Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    """Schema for creating a user (internal use)."""

    email: EmailStr
    password_hash: str
    first_name: str
    last_name: str
    role: str = "student"
    school_id: uuid.UUID | None = None
    grade: str | None = None


class UserRead(BaseModel):
    """Schema for reading a user (public response)."""

    id: uuid.UUID
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    school_id: uuid.UUID | None = None
    avatar_url: str | None = None
    grade: str | None = None
    is_active: bool
    last_login_at: datetime | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    """Schema for updating a user profile."""

    first_name: str | None = None
    last_name: str | None = None
    avatar_url: str | None = None
    grade: str | None = None
