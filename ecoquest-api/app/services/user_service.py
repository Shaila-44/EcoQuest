"""EcoQuest API — User Service.

Handles user profile management and admin user operations.
"""

from sqlalchemy.ext.asyncio import AsyncSession


class UserService:
    """Business logic for user operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    # TODO: Implement:
    # - get_profile(user_id) -> UserResponse
    # - update_profile(user_id, data) -> UserResponse
    # - list_users(filters, pagination) -> PaginatedResponse
    # - deactivate_user(user_id) -> None
