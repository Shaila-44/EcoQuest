"""Integration tests — Auth API."""

import pytest


@pytest.mark.asyncio
async def test_register_endpoint(client):
    payload = {
        "email": "student_api@ecoquest.org",
        "password": "Password123!",
        "first_name": "API",
        "last_name": "Student",
        "role": "student",
        "school_code": "SCH001",
    }
    response = await client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "student_api@ecoquest.org"
    assert data["first_name"] == "API"
    assert data["last_name"] == "Student"
    assert "password" not in data
    assert "password_hash" not in data


@pytest.mark.asyncio
async def test_login_endpoint(client):
    payload = {
        "email": "login_api@ecoquest.org",
        "password": "Password123!",
        "first_name": "Login",
        "last_name": "Tester",
    }
    await client.post("/api/v1/auth/register", json=payload)

    login_payload = {
        "email": "login_api@ecoquest.org",
        "password": "Password123!",
    }
    response = await client.post("/api/v1/auth/login", json=login_payload)
    assert response.status_code == 200
    tokens = response.json()
    assert "access_token" in tokens
    assert "refresh_token" in tokens
    assert tokens["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_refresh_token_endpoint(client):
    payload = {
        "email": "refresh_api@ecoquest.org",
        "password": "Password123!",
        "first_name": "Refresh",
        "last_name": "Tester",
    }
    await client.post("/api/v1/auth/register", json=payload)

    login_res = await client.post(
        "/api/v1/auth/login",
        json={"email": "refresh_api@ecoquest.org", "password": "Password123!"},
    )
    tokens = login_res.json()
    refresh_token = tokens["refresh_token"]

    refresh_res = await client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": refresh_token},
    )
    assert refresh_res.status_code == 200
    new_tokens = refresh_res.json()
    assert "access_token" in new_tokens
    assert "refresh_token" in new_tokens


@pytest.mark.asyncio
async def test_protected_endpoint_with_and_without_token(client):
    # Without token -> 403 / 401
    res_no_auth = await client.get("/api/v1/users/me")
    assert res_no_auth.status_code in (401, 403)

    # Register & Login
    payload = {
        "email": "me_api@ecoquest.org",
        "password": "Password123!",
        "first_name": "Profile",
        "last_name": "User",
    }
    await client.post("/api/v1/auth/register", json=payload)
    login_res = await client.post(
        "/api/v1/auth/login",
        json={"email": "me_api@ecoquest.org", "password": "Password123!"},
    )
    access_token = login_res.json()["access_token"]

    # With valid token -> 200
    headers = {"Authorization": f"Bearer {access_token}"}
    res_auth = await client.get("/api/v1/users/me", headers=headers)
    assert res_auth.status_code == 200
    profile = res_auth.json()
    assert profile["email"] == "me_api@ecoquest.org"
    assert profile["first_name"] == "Profile"

