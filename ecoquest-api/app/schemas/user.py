"""EcoQuest API — User Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from app.models.enums import UserStatus
from app.schemas.common import TimestampSchema


class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    profile_image: str | None = None
    status: UserStatus = UserStatus.ACTIVE


class UserCreate(UserBase):
    email: EmailStr
    password: str = Field(..., min_length=8, description="Raw password, hashed internally")
    role_id: uuid.UUID
    school_id: uuid.UUID
    phone: str | None = None


class UserUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=100)
    profile_image: str | None = None
    status: UserStatus | None = None
    password: str | None = Field(None, min_length=8)


class UserResponse(UserBase, TimestampSchema):
    user_id: uuid.UUID
    school_id: uuid.UUID
    role_id: uuid.UUID
    trust_score: float

    model_config = ConfigDict(from_attributes=True)
