"""EcoQuest API — User Routes."""

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter()


@router.get("/me")
async def get_current_user_profile(
    current_user: User = Depends(get_current_user),
) -> dict:
    """Get the current user's profile."""
    # TODO: Return full profile with stats
    return {"message": "User profile endpoint — not yet implemented"}


@router.put("/me")
async def update_current_user_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
) -> dict:
    """Update the current user's profile."""
    # TODO: Implement profile update
    return {"message": "User update endpoint — not yet implemented"}


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
