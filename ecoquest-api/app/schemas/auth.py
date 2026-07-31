"""EcoQuest API — Auth Schemas."""

from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    """Login request body."""

    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    """User registration request body."""

    email: EmailStr
    password: str
    first_name: str
    last_name: str
    role: str = "student"
    school_code: str | None = None
    grade: str | None = None


class TokenResponse(BaseModel):
    """JWT token pair response."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    """Token refresh request body."""

    refresh_token: str
