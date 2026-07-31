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
):
    """Get the current user's profile."""
    name_parts = (current_user.name or "").split(" ", 1)
    first_name = name_parts[0] if name_parts else ""
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    return UserRead(
        id=current_user.user_id,
        email=current_user.email_encrypted,
        first_name=first_name,
        last_name=last_name,
        role=current_user.role.name if current_user.role else "student",
        school_id=current_user.school_id,
        avatar_url=current_user.profile_image,
        is_active=True,
        created_at=current_user.created_at,
    )


@router.put("/me", response_model=UserRead)
async def update_current_user_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update the current user's profile."""
    service = UserService(db)
    user = await service.update_profile(current_user.user_id, data)
    name_parts = (user.name or "").split(" ", 1)
    first_name = name_parts[0] if name_parts else ""
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    return UserRead(
        id=user.user_id,
        email=user.email_encrypted,
        first_name=first_name,
        last_name=last_name,
        role=user.role.name if user.role else "student",
        school_id=user.school_id,
        avatar_url=user.profile_image,
        is_active=True,
        created_at=user.created_at,
    )


@router.get("", response_model=list[UserRead])
async def list_users(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all users."""
    service = UserService(db)
    users = await service.list_users()
    result = []
    for u in users:
        name_parts = (u.name or "").split(" ", 1)
        result.append(
            UserRead(
                id=u.user_id,
                email=u.email_encrypted,
                first_name=name_parts[0] if name_parts else "",
                last_name=name_parts[1] if len(name_parts) > 1 else "",
                role=u.role.name if u.role else "student",
                school_id=u.school_id,
                avatar_url=u.profile_image,
                is_active=True,
                created_at=u.created_at,
            )
        )
    return result


@router.get("/{user_id}", response_model=UserRead)
async def get_user(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a specific user's profile."""
    service = UserService(db)
    u = await service.get_profile(user_id)
    name_parts = (u.name or "").split(" ", 1)
    return UserRead(
        id=u.user_id,
        email=u.email_encrypted,
        first_name=name_parts[0] if name_parts else "",
        last_name=name_parts[1] if len(name_parts) > 1 else "",
        role=u.role.name if u.role else "student",
        school_id=u.school_id,
        avatar_url=u.profile_image,
        is_active=True,
        created_at=u.created_at,
    )
