"""Unit tests — Auth Service."""

import pytest
from fastapi import HTTPException

from app.core.security import decode_token, verify_password
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth_service import AuthService


@pytest.mark.asyncio
async def test_register_creates_user_with_argon2id(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="argon_user@ecoquest.org",
        password="SecurePassword123!",
        first_name="Argon",
        last_name="User",
        role="student",
        school_code="TEST1",
    )
    user = await auth_service.register(req)

    assert user is not None
    assert user.email_encrypted == "argon_user@ecoquest.org"
    assert user.name == "Argon User"
    assert verify_password("SecurePassword123!", user.password_hash)
    assert user.password_hash.startswith("$argon2id$")


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

    with pytest.raises(HTTPException) as exc_info:
        await auth_service.register(req)
    assert exc_info.value.status_code == 409


@pytest.mark.asyncio
async def test_login_rs256_claims(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="rs256_user@ecoquest.org",
        password="MySecretPassword123!",
        first_name="RS256",
        last_name="Tester",
    )
    await auth_service.register(req)

    login_req = LoginRequest(email="rs256_user@ecoquest.org", password="MySecretPassword123!")
    tokens = await auth_service.login(login_req)

    assert tokens.access_token is not None
    assert tokens.refresh_token is not None
    assert tokens.token_type == "bearer"

    # Decode and verify RS256 token claims
    payload = decode_token(tokens.access_token)
    assert payload["sub"] is not None
    assert "role" in payload
    assert "iat" in payload
    assert "exp" in payload
    assert "jti" in payload
    assert payload["type"] == "access"


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
    with pytest.raises(HTTPException) as exc_info:
        await auth_service.login(login_req)
    assert exc_info.value.status_code == 401


@pytest.mark.asyncio
async def test_require_admin_role_check(db_session):
    from app.api.deps import require_admin
    auth_service = AuthService(db_session)
    student_req = RegisterRequest(
        email="student_check@ecoquest.org",
        password="Password123!",
        first_name="Student",
        last_name="Role",
        role="student",
    )
    created_user = await auth_service.register(student_req)
    student_user = await auth_service.user_repo.get_by_id(created_user.user_id)

    with pytest.raises(HTTPException) as exc_info:
        await require_admin(student_user)
    assert exc_info.value.status_code == 403


@pytest.mark.asyncio
async def test_refresh_token_rotation(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="rotation@ecoquest.org",
        password="Password123!",
        first_name="Rotation",
        last_name="Test",
    )
    await auth_service.register(req)

    login_req = LoginRequest(email="rotation@ecoquest.org", password="Password123!")
    env = await auth_service.login(login_req, device_id="dev-1")
    old_refresh = env.refresh_token

    # Rotate refresh token
    rotated = await auth_service.refresh_token(old_refresh)
    assert rotated.access_token is not None
    assert rotated.refresh_token != old_refresh

    # Old refresh token should now be revoked and rejected
    with pytest.raises(HTTPException) as exc:
        await auth_service.refresh_token(old_refresh)
    assert exc.value.status_code == 401


@pytest.mark.asyncio
async def test_one_device_login_and_approval(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="onedevice@ecoquest.org",
        password="Password123!",
        first_name="One",
        last_name="Device",
    )
    user = await auth_service.register(req)

    # First login from device-1 succeeds immediately
    login_1 = LoginRequest(email="onedevice@ecoquest.org", password="Password123!")
    env_1 = await auth_service.login(login_1, device_id="device-1", device_name="Laptop")
    assert env_1.status == "SUCCESS"
    assert env_1.access_token is not None

    # Second login from device-2 requires approval
    login_2 = LoginRequest(email="onedevice@ecoquest.org", password="Password123!")
    env_2 = await auth_service.login(login_2, device_id="device-2", device_name="Mobile Phone")
    assert env_2.status == "APPROVAL_REQUIRED"
    assert env_2.request_id is not None

    # Verify pending approval request exists
    user_loaded = await auth_service.user_repo.get_by_id(user.user_id)
    pending = await auth_service.get_pending_device_requests(user_loaded.user_id)
    assert len(pending) == 1
    assert pending[0].request_id == env_2.request_id

    # Approve request from active device session
    tokens_approved = await auth_service.approve_device_request(user_loaded, env_2.request_id)
    assert tokens_approved.access_token is not None
    assert tokens_approved.refresh_token is not None


@pytest.mark.asyncio
async def test_password_change_revokes_sessions(db_session):
    auth_service = AuthService(db_session)
    req = RegisterRequest(
        email="change_pwd@ecoquest.org",
        password="OldPassword123!",
        first_name="Change",
        last_name="Pwd",
    )
    user = await auth_service.register(req)
    user_loaded = await auth_service.user_repo.get_by_id(user.user_id)

    login_req = LoginRequest(email="change_pwd@ecoquest.org", password="OldPassword123!")
    env = await auth_service.login(login_req, device_id="dev-pwd")
    old_refresh = env.refresh_token

    # Change password
    await auth_service.change_password(user_loaded, "OldPassword123!", "NewPassword123!")

    # Verify old session refresh is now revoked
    with pytest.raises(HTTPException) as exc:
        await auth_service.refresh_token(old_refresh)
    assert exc.value.status_code == 401

    # Verify login works with new password
    login_new = LoginRequest(email="change_pwd@ecoquest.org", password="NewPassword123!")
    env_new = await auth_service.login(login_new, device_id="dev-pwd")
    assert env_new.status == "SUCCESS"




