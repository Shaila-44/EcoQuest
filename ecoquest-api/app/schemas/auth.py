from __future__ import annotations

"""EcoQuest API — Auth Schemas."""

import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr, model_validator


class LoginRequest(BaseModel):
    """Login request body supporting email, student_id, password, and optional school_code/school_id validation."""

    email: Optional[EmailStr] = None
    student_id: Optional[str] = None
    password: str
    school_code: Optional[str] = None
    school_id: Optional[uuid.UUID] = None

    @model_validator(mode="after")
    def validate_identifier(self) -> LoginRequest:
        if not self.email and not self.student_id:
            raise ValueError("Either email or student_id must be provided for login.")
        return self



class RegisterRequest(BaseModel):
    """User registration request body."""

    email: EmailStr
    password: str
    first_name: str
    last_name: str
    role: str = "student"
    school_code: Optional[str] = None
    grade: Optional[str] = None



class TokenResponse(BaseModel):
    """JWT token pair response."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    """Token refresh request body."""

    refresh_token: str
