from __future__ import annotations

"""EcoQuest API — Role-Based Access Control.

Permission-based RBAC system. Endpoints check permissions, not roles.
"""

from enum import Enum

from fastapi import HTTPException, status

from app.models.enums import RoleName

# Alias UserRole to RoleName for backward compatibility
UserRole = RoleName


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


def require_role(allowed_roles: list[RoleName]):
    """FastAPI dependency factory to enforce allowed roles."""

    def role_checker(current_user):
        user_role = None

        if hasattr(current_user, "role") and current_user.role:
            user_role = getattr(current_user.role, "role_name", current_user.role)

        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User role not authorized to access this resource.",
            )

        return current_user

    return role_checker
