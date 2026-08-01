from __future__ import annotations

"""EcoQuest API — User Schemas."""


import uuid
from datetime import datetime

from typing import Any, Optional
from pydantic import BaseModel, EmailStr, model_validator


class UserCreate(BaseModel):
    """Schema for creating a user (internal use)."""

    email: EmailStr
    password_hash: str
    first_name: str
    last_name: str
    role: str = "student"
    school_id: Optional[uuid.UUID] = None
    grade: Optional[str] = None


class UserRead(BaseModel):
    """Schema for reading a user (public response)."""

    id: uuid.UUID
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    school_id: Optional[uuid.UUID] = None
    avatar_url: Optional[str] = None
    grade: Optional[str] = None
    is_active: bool
    last_login_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}

    @model_validator(mode="before")
    @classmethod
    def extract_fields_from_orm(cls, data: Any) -> Any:
        if hasattr(data, "user_id"):
            role_str = "student"
            if "role" in data.__dict__ and data.role is not None:
                r_name = data.role.role_name
                role_str = r_name.value if hasattr(r_name, "value") else str(r_name)
            return {
                "id": data.user_id,
                "email": data.email_encrypted,
                "first_name": data.first_name,
                "last_name": data.last_name,
                "role": role_str,
                "school_id": data.school_id,
                "avatar_url": data.profile_image,
                "grade": None,
                "is_active": data.is_active,
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
