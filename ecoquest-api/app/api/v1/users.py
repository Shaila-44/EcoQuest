"""EcoQuest API — User Routes."""

import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserRead, UserUpdate
from app.services.user_service import UserService


router = APIRouter()


@router.get("/me", response_model=UserRead, status_code=200)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user),
) -> UserRead:
    """Get the current user's profile."""
    return UserRead.model_validate(current_user)


@router.put("/me", response_model=UserRead, status_code=200)
async def update_current_user_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserRead:
    """Update the current user's profile."""
    service = UserService(db)
    user = await service.update_profile(current_user.user_id, data)
    return UserRead.model_validate(user)


@router.get("", response_model=list[UserRead], status_code=200)
async def list_users(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[UserRead]:
    """List all users (admin only)."""
    service = UserService(db)
    users = await service.list_users()
    return [UserRead.model_validate(u) for u in users]


@router.get("/{user_id}", response_model=UserRead, status_code=200)
async def get_user(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserRead:
    """Get a specific user's details (admin/teacher)."""
    service = UserService(db)
    u = await service.get_profile(user_id)
    return UserRead.model_validate(u)
