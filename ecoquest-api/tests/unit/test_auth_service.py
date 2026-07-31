"""Unit tests — Auth Service."""

import uuid
from unittest.mock import AsyncMock
import pytest

from app.core.exceptions import AuthenticationError, DuplicateError
from app.core.security import hash_password, verify_password
from app.models.user import User, UserRole
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth_service import AuthService


@pytest.mark.asyncio
async def test_register_creates_user():
    session = AsyncMock()
    service = AuthService(session)
    service.user_repo = AsyncMock()
    service.user_repo.get_by_email.return_value = None

    created_user = User(
        id=uuid.uuid4(),
        email="test@example.com",
        password_hash="hashed_pw",
        first_name="Test",
        last_name="User",
        role=UserRole.STUDENT,
    )
    service.user_repo.create.return_value = created_user

    req = RegisterRequest(
        email="test@example.com",
        password="secretpassword",
        first_name="Test",
        last_name="User",
        role="student",
    )
    user = await service.register(req)

    assert user.email == "test@example.com"
    assert service.user_repo.create.called


@pytest.mark.asyncio
async def test_register_duplicate_email_raises():
    session = AsyncMock()
    service = AuthService(session)
    service.user_repo = AsyncMock()
    service.user_repo.get_by_email.return_value = User(email="test@example.com")

    req = RegisterRequest(
        email="test@example.com",
        password="secretpassword",
        first_name="Test",
        last_name="User",
    )

    with pytest.raises(DuplicateError):
        await service.register(req)


@pytest.mark.asyncio
async def test_password_hash_is_not_plaintext():
    session = AsyncMock()
    service = AuthService(session)
    service.user_repo = AsyncMock()
    service.user_repo.get_by_email.return_value = None

    req = RegisterRequest(
        email="test@example.com",
        password="plain_password_123",
        first_name="Test",
        last_name="User",
    )

    async def mock_create(user_obj):
        return user_obj

    service.user_repo.create.side_effect = mock_create

    user = await service.register(req)
    assert user.password_hash != "plain_password_123"
    assert verify_password("plain_password_123", user.password_hash)


@pytest.mark.asyncio
async def test_login_success():
    session = AsyncMock()
    service = AuthService(session)
    service.user_repo = AsyncMock()

    mock_user = User(
        id=uuid.uuid4(),
        email="user@example.com",
        password_hash=hash_password("correct_password"),
        first_name="Test",
        last_name="User",
        role=UserRole.STUDENT,
        is_active=True,
    )
    service.user_repo.get_by_email.return_value = mock_user

    req = LoginRequest(email="user@example.com", password="correct_password")
    tokens = await service.login(req)

    assert tokens.access_token is not None
    assert tokens.refresh_token is not None
    assert tokens.token_type == "bearer"


@pytest.mark.asyncio
async def test_login_wrong_password():
    session = AsyncMock()
    service = AuthService(session)
    service.user_repo = AsyncMock()

    mock_user = User(
        id=uuid.uuid4(),
        email="user@example.com",
        password_hash=hash_password("correct_password"),
        first_name="Test",
        last_name="User",
        role=UserRole.STUDENT,
        is_active=True,
    )
    service.user_repo.get_by_email.return_value = mock_user

    req = LoginRequest(email="user@example.com", password="wrong_password")
    with pytest.raises(AuthenticationError):
        await service.login(req)

