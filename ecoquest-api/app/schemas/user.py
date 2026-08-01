from __future__ import annotations

"""EcoQuest API — User Schemas."""

import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, model_validator

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

    @model_validator(mode="before")
    @classmethod
    def extract_fields_from_orm(cls, data: Any) -> Any:
        if hasattr(data, "user_id"):
            role_str = "student"
            if hasattr(data, "role") and data.role is not None:
                r_val = getattr(data.role, "role_name", None)
                role_str = r_val.value if hasattr(r_val, "value") else str(r_val)

            name = getattr(data, "name", "")
            parts = name.split(" ", 1)
            first_name = parts[0]
            last_name = parts[1] if len(parts) > 1 else ""

            return {
                "id": data.user_id,
                "email": getattr(data, "email_encrypted", getattr(data, "email", "")),
                "first_name": first_name,
                "last_name": last_name,
                "role": role_str,
                "school_id": getattr(data, "school_id", None),
                "avatar_url": getattr(data, "profile_image", None),
                "grade": None,
                "is_active": data.status == UserStatus.ACTIVE if hasattr(data, "status") else True,
                "last_login_at": None,
                "created_at": getattr(data, "created_at", datetime.now()),
            }
        return data


class UserUpdate(BaseModel):
    """Schema for updating a user profile."""

    first_name: str | None = None
    last_name: str | None = None
    avatar_url: str | None = None
    grade: str | None = None

