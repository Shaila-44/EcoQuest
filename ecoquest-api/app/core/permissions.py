"""EcoQuest API — Role-Based Access Control.

Permission-based RBAC system. Endpoints check permissions, not roles.
"""

from enum import Enum

from fastapi import HTTPException, status

from app.models.user import UserRole


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


ROLE_PERMISSIONS: dict[UserRole, set[Permission]] = {
    UserRole.STUDENT: {
        Permission.SUBMISSION_CREATE,
        Permission.SUBMISSION_VIEW_OWN,
    },
    UserRole.TEACHER: {
        Permission.CHALLENGE_CREATE,
        Permission.CHALLENGE_EDIT_OWN,
        Permission.CHALLENGE_DELETE,
        Permission.SUBMISSION_VIEW_SCHOOL,
        Permission.REVIEW_CREATE,
        Permission.REVIEW_OVERRIDE,
        Permission.USER_VIEW_SCHOOL,
    },
    UserRole.ADMIN: set(Permission),  # All permissions
}


def has_permission(role: UserRole, permission: Permission) -> bool:
    """Check if a role has a specific permission."""
    return permission in ROLE_PERMISSIONS.get(role, set())


def require_permission(role: UserRole, permission: Permission) -> None:
    """Raise 403 if the role does not have the required permission.

    Use in route handlers:
        require_permission(current_user.role, Permission.CHALLENGE_CREATE)
    """
    if not has_permission(role, permission):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
