"""Unit tests — Auth Service."""

import pytest
from app.core.exceptions import AuthenticationError, DuplicateError
from app.core.security import verify_password
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth_service import AuthService


@pytest.mark.asyncio
async def test_register_creates_user(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="teststudent@ecoquest.org",
        password="SecurePassword123!",
        first_name="Test",
        last_name="Student",
        role="student",
        school_code="TEST1",
    )
    user = await auth_service.register(req)

    assert user is not None
    assert user.email_encrypted == "teststudent@ecoquest.org"
    assert user.name == "Test Student"
    assert verify_password("SecurePassword123!", user.password_hash)


@pytest.mark.asyncio
async def test_register_duplicate_email_raises(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="duplicate@ecoquest.org",
        password="SecurePassword123!",
        first_name="Test",
        last_name="Student",
        role="student",
    )
    await auth_service.register(req)

    with pytest.raises(DuplicateError):
        await auth_service.register(req)


@pytest.mark.asyncio
async def test_login_success(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="login_user@ecoquest.org",
        password="MySecretPassword123!",
        first_name="Login",
        last_name="User",
    )
    await auth_service.register(req)

    login_req = LoginRequest(email="login_user@ecoquest.org", password="MySecretPassword123!")
    tokens = await auth_service.login(login_req)

    assert tokens.access_token is not None
    assert tokens.refresh_token is not None
    assert tokens.token_type == "bearer"


@pytest.mark.asyncio
async def test_login_wrong_password(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="wrong_pwd@ecoquest.org",
        password="CorrectPassword123!",
        first_name="Wrong",
        last_name="Pwd",
    )
    await auth_service.register(req)

    login_req = LoginRequest(email="wrong_pwd@ecoquest.org", password="WrongPassword123!")
    with pytest.raises(AuthenticationError):
        await auth_service.login(login_req)


@pytest.mark.asyncio
async def test_password_hash_is_not_plaintext(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="plain_pwd@ecoquest.org",
        password="MySecretPassword123!",
        first_name="Plain",
        last_name="Password",
    )
    user = await auth_service.register(req)
    assert user.password_hash != "MySecretPassword123!"
    assert user.password_hash.startswith("$2")

