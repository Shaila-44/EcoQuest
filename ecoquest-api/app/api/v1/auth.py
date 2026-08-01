from __future__ import annotations

import uuid
from typing import Optional

from fastapi import APIRouter, Depends, Header, Request, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.config import settings
from app.core.limiter import limiter
from app.db.session import get_db

from app.models.user import User
from app.schemas.auth import LoginRequest, RefreshRequest, RegisterRequest, TokenResponse
from app.schemas.common import MessageResponse
from app.schemas.session import (
    ChangePasswordRequest,
    DeviceApprovalRead,
    LoginResponseEnvelope,
    SessionRead,
)
from app.schemas.user import UserRead
from app.services.auth_service import AuthService

router = APIRouter()



def set_auth_cookie(response: Response, token: str) -> None:
    """Set HttpOnly access token cookie."""
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=settings.COOKIE_SECURE if settings.COOKIE_SECURE else (settings.ENVIRONMENT != "development"),
        samesite=settings.COOKIE_SAMESITE,
        max_age=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=UserRead,
)
@limiter.limit("5/minute")
async def register(
    request: Request,
    data: RegisterRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
) -> UserRead:
    """Register a new user, log them in via HttpOnly cookie, and return UserRead."""
    service = AuthService(db)
    user = await service.register(data)

    
    # Generate access token & set cookie
    login_data = LoginRequest(email=data.email, password=data.password)
    login_env = await service.login(login_data)
    if login_env.access_token:
        set_auth_cookie(response, login_env.access_token)

    return UserRead.model_validate(user)


@router.post("/login", response_model=LoginResponseEnvelope)
@limiter.limit("10/minute")

async def login(
    request: Request,
    data: LoginRequest,
    response: Response,
    x_device_id: Optional[str] = Header(default="default-device", alias="X-Device-ID"),
    x_device_name: Optional[str] = Header(default="Browser Session", alias="X-Device-Name"),
    db: AsyncSession = Depends(get_db),
) -> LoginResponseEnvelope:
    """Authenticate credentials, enforce one-device session policy, set HttpOnly cookie on success."""
    service = AuthService(db)
    ip_addr = request.client.host if request.client else None
    login_env = await service.login(
        data,
        device_id=x_device_id or "default-device",
        device_name=x_device_name or "Browser Session",
        ip_address=ip_addr,
    )
    if login_env.access_token:
        set_auth_cookie(response, login_env.access_token)
    return login_env


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    data: Optional[RefreshRequest] = None,
    response: Response = None,
    x_refresh_token: Optional[str] = Header(default=None, alias="X-Refresh-Token"),
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    """Exchange a refresh token for a new access token using Refresh Token Rotation."""
    service = AuthService(db)
    token_str = (data.refresh_token if data else None) or x_refresh_token
    if not token_str:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token is required.",
        )
    token_response = await service.refresh_token(token_str)
    if response:
        set_auth_cookie(response, token_response.access_token)
    return token_response


@router.post("/logout", response_model=MessageResponse)
async def logout(
    response: Response,
    data: Optional[RefreshRequest] = None,
    current_user: Optional[User] = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Clear HttpOnly authentication cookie and revoke DB session."""
    response.delete_cookie(key="access_token")
    if current_user or data:
        service = AuthService(db)
        u_id = current_user.user_id if current_user else uuid.UUID(int=0)
        ref_str = data.refresh_token if data else None
        await service.logout(u_id, ref_str)
    return MessageResponse(message="Logout successful.")


@router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)) -> UserRead:
    """Get current authenticated user details."""
    return UserRead.model_validate(current_user)


# --- Session Management Endpoints ---

@router.get("/sessions", response_model=list[SessionRead])
async def list_active_sessions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[SessionRead]:
    """Get all active sessions for the current user."""
    service = AuthService(db)
    sessions = await service.get_active_sessions(current_user.user_id)
    return [SessionRead.model_validate(s) for s in sessions]


@router.delete("/sessions/{session_id}", response_model=MessageResponse)
async def revoke_session(
    session_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Revoke a specific active session."""
    service = AuthService(db)
    await service.revoke_session(current_user, session_id)
    return MessageResponse(message="Session revoked successfully.")


@router.post("/logout-all", response_model=MessageResponse)
async def logout_all(
    response: Response,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Revoke all active sessions for the current user."""
    service = AuthService(db)
    response.delete_cookie(key="access_token")
    revoked_count = await service.logout_all(current_user.user_id)
    return MessageResponse(message=f"All {revoked_count} active sessions revoked successfully.")


@router.post("/change-password", response_model=MessageResponse)
async def change_password(
    data: ChangePasswordRequest,
    response: Response,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Change current user password and revoke all existing active sessions."""
    service = AuthService(db)
    await service.change_password(current_user, data.current_password, data.new_password)
    response.delete_cookie(key="access_token")
    return MessageResponse(message="Password changed successfully. All existing sessions have been revoked.")


# --- Device Approval Endpoints ---

@router.get("/devices/pending", response_model=list[DeviceApprovalRead])
async def get_pending_device_requests(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[DeviceApprovalRead]:
    """Get all pending device login approval requests for the current user."""
    service = AuthService(db)
    approvals = await service.get_pending_device_requests(current_user.user_id)
    return [DeviceApprovalRead.model_validate(a) for a in approvals]


@router.post("/devices/{request_id}/approve", response_model=TokenResponse)
async def approve_device_request(
    request_id: uuid.UUID,
    response: Response,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    """Approve a pending device login request from an active device session."""
    service = AuthService(db)
    tokens = await service.approve_device_request(current_user, request_id)
    set_auth_cookie(response, tokens.access_token)
    return tokens


@router.post("/devices/{request_id}/reject", response_model=MessageResponse)
async def reject_device_request(
    request_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> MessageResponse:
    """Reject a pending device login request."""
    service = AuthService(db)
    await service.reject_device_request(current_user, request_id)
    return MessageResponse(message="Device login request rejected successfully.")


