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


@router.get("/me", response_model=UserRead)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserRead:
    """Get the current user's profile."""
    user_service = UserService(db)
    return await user_service.get_profile(current_user)


@router.put("/me", response_model=UserRead)
async def update_current_user_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserRead:
    """Update the current user's profile."""
    user_service = UserService(db)
    return await user_service.update_profile(current_user, data)


@router.get("")
async def list_users(
    current_user: User = Depends(get_current_user),
) -> dict:
    """List all users (admin only)."""
    # TODO: Implement with RBAC check + pagination
    return {"message": "User list endpoint — not yet implemented"}


@router.get("/{user_id}")
async def get_user(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get a specific user's details (admin/teacher)."""
    # TODO: Implement with RBAC check
    return {"message": "User detail endpoint — not yet implemented"}

