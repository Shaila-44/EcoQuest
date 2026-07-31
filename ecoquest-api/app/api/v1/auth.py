from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.auth import LoginRequest, RefreshRequest, RegisterRequest, TokenResponse
from app.schemas.common import MessageResponse
from app.schemas.user import UserRead
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_db),
) -> UserRead:
    """Register a new user."""
    auth_service = AuthService(db)
    user = await auth_service.register(data)
    return UserRead.model_validate(user)


@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    """Authenticate and return JWT tokens."""
    auth_service = AuthService(db)
    return await auth_service.login(data)


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    data: RefreshRequest,
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    """Exchange a refresh token for a new access token."""
    auth_service = AuthService(db)
    return await auth_service.refresh_token(data.refresh_token)


@router.post("/logout", response_model=MessageResponse)
async def logout(
    data: RefreshRequest | None = None,
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Invalidate the current refresh token."""
    auth_service = AuthService(db)
    await auth_service.logout(data.refresh_token if data else None)
    return MessageResponse(message="Successfully logged out")

