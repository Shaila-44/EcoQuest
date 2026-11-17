"""Integration tests — Auth API."""

import pytest


@pytest.mark.asyncio
async def test_register_and_login_cookie_endpoints(client):
    register_payload = {
        "email": "cookie_user@ecoquest.org",
        "password": "Password123!",
        "first_name": "Cookie",
        "last_name": "Tester",
        "role": "student",
    }

    # 1. Test POST /auth/register sets HttpOnly cookie
    res_reg = await client.post("/auth/register", json=register_payload)
    assert res_reg.status_code == 201
    assert "access_token" in res_reg.cookies

    # 2. Test GET /auth/me using HttpOnly cookie authentication
    res_me = await client.get("/auth/me")
    assert res_me.status_code == 200
    me_data = res_me.json()
    assert me_data["email"] == "cookie_user@ecoquest.org"
    assert me_data["first_name"] == "Cookie"

    # 3. Test POST /auth/logout clears cookie
    res_logout = await client.post("/auth/logout")
    assert res_logout.status_code == 200

    # 4. Test POST /auth/login sets HttpOnly cookie & returns TokenResponse
    login_payload = {
        "email": "cookie_user@ecoquest.org",
        "password": "Password123!",
    }
    res_login = await client.post("/auth/login", json=login_payload)
    assert res_login.status_code == 200
    tokens = res_login.json()
    assert "access_token" in tokens
    assert "access_token" in res_login.cookies


@pytest.mark.asyncio
async def test_unauthenticated_me_returns_401(client):
    res = await client.get("/auth/me")
    assert res.status_code == 401


@pytest.mark.asyncio
async def test_sessions_and_logout_all_integration(client):
    register_payload = {
        "email": "session_api@ecoquest.org",
        "password": "Password123!",
        "first_name": "Session",
        "last_name": "User",
    }
    await client.post("/auth/register", json=register_payload)

    # List sessions
    res_sessions = await client.get("/auth/sessions")
    assert res_sessions.status_code == 200
    sessions = res_sessions.json()
    assert len(sessions) >= 1

    # Logout all
    res_logout_all = await client.post("/auth/logout-all")
    assert res_logout_all.status_code == 200

    # Unauthenticated after logout all
    res_me = await client.get("/auth/me")
    assert res_me.status_code == 401


@pytest.mark.asyncio
async def test_change_password_integration(client):
    register_payload = {
        "email": "pwd_api@ecoquest.org",
        "password": "OldPassword123!",
        "first_name": "Pwd",
        "last_name": "Api",
    }
    await client.post("/auth/register", json=register_payload)

    # Change password
    pwd_payload = {
        "current_password": "OldPassword123!",
        "new_password": "NewPassword123!",
    }
    res_change = await client.post("/auth/change-password", json=pwd_payload)
    assert res_change.status_code == 200

    # Re-login with new password
    login_payload = {
        "email": "pwd_api@ecoquest.org",
        "password": "NewPassword123!",
    }
    res_login = await client.post("/auth/login", json=login_payload)
    assert res_login.status_code == 200
    assert res_login.json()["status"] == "SUCCESS"


