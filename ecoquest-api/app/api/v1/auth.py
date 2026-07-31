"""EcoQuest API — Auth Routes."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.auth import LoginRequest, RefreshRequest, RegisterRequest, TokenResponse
from app.schemas.common import MessageResponse
from app.schemas.user import UserRead
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/register", status_code=201, response_model=UserRead)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    """Register a new user."""
    service = AuthService(db)
    user = await service.register(data)
    return UserRead(
        id=user.user_id,
        email=user.email_encrypted,
        first_name=data.first_name,
        last_name=data.last_name,
        role=user.role.name if user.role else "student",
        school_id=user.school_id,
        is_active=True,
        created_at=user.created_at,
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """Authenticate and return JWT tokens."""
    service = AuthService(db)
    return await service.login(data)


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    data: RefreshRequest,
    db: AsyncSession = Depends(get_db),
):
    """Exchange a refresh token for a new access token."""
    service = AuthService(db)
    return await service.refresh_token(data.refresh_token)


@router.post("/logout", response_model=MessageResponse)
async def logout():
    """Invalidate the current refresh token."""
    return MessageResponse(message="Logout successful.")
