from __future__ import annotations

"""EcoQuest API — Role-Based Access Control.

Permission-based RBAC system. Endpoints check permissions, not roles.
"""

from enum import Enum
from typing import Callable, Any

from fastapi import Depends, HTTPException, status

from app.models.enums import RoleName


class Permission(str, Enum):
    """Fine-grained permissions for RBAC."""

    # Challenges
    CHALLENGE_CREATE = "challenge:create"
    CHALLENGE_EDIT_OWN = "challenge:edit_own"
    CHALLENGE_EDIT_ANY = "challenge:edit_any"
    CHALLENGE_DELETE = "challenge:delete"

    # Submissions
    SUBMISSION_CREATE = "submission:create"
    SUBMISSION_VIEW_OWN = "submission:view_own"
    SUBMISSION_VIEW_SCHOOL = "submission:view_school"
    SUBMISSION_VIEW_ALL = "submission:view_all"

    # Reviews
    REVIEW_CREATE = "review:create"
    REVIEW_OVERRIDE = "review:override"

    # Users
    USER_VIEW_SCHOOL = "user:view_school"
    USER_MANAGE = "user:manage"

    # Admin
    ADMIN_ACCESS = "admin:access"
    SCHOOL_MANAGE = "school:manage"


ROLE_PERMISSIONS: dict[RoleName, set[Permission]] = {
    RoleName.STUDENT: {
        Permission.SUBMISSION_CREATE,
        Permission.SUBMISSION_VIEW_OWN,
    },
    RoleName.TEACHER: {
        Permission.CHALLENGE_CREATE,
        Permission.CHALLENGE_EDIT_OWN,
        Permission.CHALLENGE_DELETE,
        Permission.SUBMISSION_VIEW_SCHOOL,
        Permission.REVIEW_CREATE,
        Permission.REVIEW_OVERRIDE,
        Permission.USER_VIEW_SCHOOL,
    },
    RoleName.SCHOOL_ADMIN: set(Permission),
    RoleName.SUPER_ADMIN: set(Permission),
}


def has_permission(role: RoleName, permission: Permission) -> bool:
    """Check if a role has a specific permission."""
    return permission in ROLE_PERMISSIONS.get(role, set())


def require_permission(role: RoleName, permission: Permission) -> None:
    """Raise 403 if the role does not have the required permission.

    Use in route handlers:
        require_permission(current_user.role.role_name, Permission.CHALLENGE_CREATE)
    """
    if not has_permission(role, permission):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )


def require_role(*allowed_roles: str) -> Callable[..., Any]:
    """FastAPI dependency for checking if user role matches one of allowed_roles."""
    from app.api.deps import get_current_user
    from app.models.user import User

    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_role_str = "student"
        if hasattr(current_user, "role") and current_user.role:
            r_val = getattr(current_user.role, "role_name", None)
            user_role_str = r_val.value if hasattr(r_val, "value") else str(r_val)

        if user_role_str.lower() not in [r.lower() for r in allowed_roles]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user

    return role_checker

