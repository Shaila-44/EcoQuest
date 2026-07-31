"""EcoQuest API — Auth Routes."""

from fastapi import APIRouter

from app.schemas.auth import LoginRequest, RegisterRequest, RefreshRequest, TokenResponse
from app.schemas.common import MessageResponse

router = APIRouter()


@router.post("/register", status_code=201)
async def register(data: RegisterRequest) -> dict:
    """Register a new user."""
    # TODO: Implement registration logic
    return {"message": "Registration endpoint — not yet implemented"}


@router.post("/login")
async def login(data: LoginRequest) -> dict:
    """Authenticate and return JWT tokens."""
    # TODO: Implement login logic
    return {"message": "Login endpoint — not yet implemented"}


@router.post("/refresh")
async def refresh_token(data: RefreshRequest) -> dict:
    """Exchange a refresh token for a new access token."""
    # TODO: Implement token refresh logic
    return {"message": "Token refresh endpoint — not yet implemented"}


@router.post("/logout")
async def logout() -> MessageResponse:
    """Invalidate the current refresh token."""
    # TODO: Implement logout logic
    return MessageResponse(message="Logout endpoint — not yet implemented")
