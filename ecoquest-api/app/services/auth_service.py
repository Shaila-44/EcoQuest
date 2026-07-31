"""EcoQuest API — Auth Service.

Handles authentication business logic: registration, login,
token creation, token refresh, and logout.
"""

from sqlalchemy.ext.asyncio import AsyncSession


class AuthService:
    """Business logic for authentication operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    # TODO: Implement:
    # - register(data: RegisterRequest) -> User
    # - login(email, password) -> TokenResponse
    # - refresh_token(refresh_token) -> TokenResponse
    # - logout(refresh_token) -> None
