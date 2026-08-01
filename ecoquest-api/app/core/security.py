from __future__ import annotations

"""EcoQuest API — Security Utilities.

JWT creation/verification using RS256 and Argon2id password hashing.
"""

import os
import uuid
from datetime import UTC, datetime, timedelta

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from jose import jwt
from passlib.context import CryptContext

from app.config import settings

# Argon2id password hashing as primary, bcrypt for legacy compatibility
pwd_context = CryptContext(schemes=["argon2", "bcrypt"], deprecated="auto")

_cached_private_key_pem: str | None = None
_cached_public_key_pem: str | None = None


def get_rsa_keys() -> tuple[str, str]:
    """Retrieve or dynamically generate RSA 2048-bit key pair for RS256 signing."""
    global _cached_private_key_pem, _cached_public_key_pem

    if _cached_private_key_pem and _cached_public_key_pem:
        return _cached_private_key_pem, _cached_public_key_pem

    # 1. Check environment variables
    if settings.RSA_PRIVATE_KEY and settings.RSA_PUBLIC_KEY:
        _cached_private_key_pem = settings.RSA_PRIVATE_KEY.replace("\\n", "\n")
        _cached_public_key_pem = settings.RSA_PUBLIC_KEY.replace("\\n", "\n")
        return _cached_private_key_pem, _cached_public_key_pem

    # 2. Check key file paths
    if settings.RSA_PRIVATE_KEY_PATH and settings.RSA_PUBLIC_KEY_PATH:
        if os.path.exists(settings.RSA_PRIVATE_KEY_PATH) and os.path.exists(settings.RSA_PUBLIC_KEY_PATH):
            with open(settings.RSA_PRIVATE_KEY_PATH, encoding="utf-8") as f:
                _cached_private_key_pem = f.read()
            with open(settings.RSA_PUBLIC_KEY_PATH, encoding="utf-8") as f:
                _cached_public_key_pem = f.read()
            return _cached_private_key_pem, _cached_public_key_pem

    # 3. Auto-generate ephemeral RSA key pair for development
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    _cached_private_key_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    ).decode("utf-8")

    _cached_public_key_pem = private_key.public_key().public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    ).decode("utf-8")

    return _cached_private_key_pem, _cached_public_key_pem


def hash_password(password: str) -> str:
    """Hash a plaintext password using Argon2id."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plaintext password against an Argon2id or bcrypt hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None,
    role: str = "USER",
) -> str:
    """Create an RS256 JWT access token with required claims (sub, role, iat, exp, jti)."""
    private_key_pem, _ = get_rsa_keys()
    to_encode = data.copy()

    now = datetime.now(UTC)
    expire = now + (
        expires_delta or timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    to_encode.update(
        {
            "sub": str(data.get("sub", "")),
            "role": data.get("role", role),
            "iat": int(now.timestamp()),
            "exp": int(expire.timestamp()),
            "jti": str(uuid.uuid4()),
            "type": "access",
        }
    )

    algorithm = settings.JWT_ALGORITHM
    key = private_key_pem if algorithm == "RS256" else settings.JWT_SECRET_KEY

    return jwt.encode(to_encode, key, algorithm=algorithm)


def create_refresh_token(
    data: dict,
    expires_delta: timedelta | None = None,
    role: str = "USER",
) -> str:
    """Create an RS256 JWT refresh token."""
    private_key_pem, _ = get_rsa_keys()
    to_encode = data.copy()

    now = datetime.now(UTC)
    expire = now + (
        expires_delta or timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS)
    )

    to_encode.update(
        {
            "sub": str(data.get("sub", "")),
            "role": data.get("role", role),
            "iat": int(now.timestamp()),
            "exp": int(expire.timestamp()),
            "jti": str(uuid.uuid4()),
            "type": "refresh",
        }
    )

    algorithm = settings.JWT_ALGORITHM
    key = private_key_pem if algorithm == "RS256" else settings.JWT_SECRET_KEY

    return jwt.encode(to_encode, key, algorithm=algorithm)


def decode_token(token: str) -> dict:
    """Decode and verify a JWT token using RS256 public key."""
    _, public_key_pem = get_rsa_keys()
    algorithm = settings.JWT_ALGORITHM
    key = public_key_pem if algorithm == "RS256" else settings.JWT_SECRET_KEY

    return jwt.decode(token, key, algorithms=[algorithm])

