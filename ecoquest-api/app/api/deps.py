from __future__ import annotations

"""EcoQuest API — Shared Dependencies.

FastAPI dependency injection for database sessions and current user.
"""

import uuid
from typing import Optional

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import decode_token
from app.db.session import get_db
from app.models.enums import RoleName, UserStatus
from app.models.user import User
from app.repositories.user_repo import UserRepository

security_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Dependency that extracts and validates the current user from HttpOnly Cookie or Bearer header."""
    token: Optional[str] = None

    # 1. Check HttpOnly cookie
    token = request.cookies.get("access_token")

    # 2. Fall back to Authorization Bearer header
    if not token and credentials:
        token = credentials.credentials

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token missing",
        )

    try:
        payload = decode_token(token)
        user_id = payload.get("sub")
        token_type = payload.get("type")
        if not user_id or token_type != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token claims",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    try:
        user_uuid = uuid.UUID(str(user_id))
    except (ValueError, AttributeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token subject",
        )

    repo = UserRepository(db)
    user = await repo.get_by_id(user_uuid)

    if user is None or user.status != UserStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or deactivated",
        )

    return user


async def require_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """Dependency ensuring an authenticated user is present."""
    return current_user


async def require_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    """Dependency requiring an administrative user role (ADMIN, SUPER_ADMIN, SCHOOL_ADMIN)."""
    admin_roles = {
        RoleName.SCHOOL_ADMIN,
        RoleName.SUPER_ADMIN,
        "ADMIN",
        "School Admin",
        "Super Admin",
    }

    user_role_str = "USER"
    if "role" in current_user.__dict__ and current_user.role:
        r_val = getattr(current_user.role, "role_name", None)
        user_role_str = r_val.value if hasattr(r_val, "value") else str(r_val)

    if user_role_str not in admin_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin authorization required",
        )

    return current_user

