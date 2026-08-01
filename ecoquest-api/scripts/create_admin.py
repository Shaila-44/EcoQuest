"""EcoQuest API — Create Admin User Script.

Creates the initial Super Admin account. Admin accounts are intentionally
NOT reachable through public /auth/register (see AuthService.register) — this
script is the only supported way to provision one.

Credentials are read from ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME /
ADMIN_SCHOOL_CODE env vars, falling back to demo defaults. Safe to run
multiple times — if the account already exists it is left untouched.

Usage: python scripts/create_admin.py
"""

import asyncio
import hashlib
import os

from app.core.security import hash_password
from app.db.session import async_session_factory
from app.models.enums import RoleName, UserStatus
from app.models.user import User
from app.repositories.user_repo import UserRepository

DEFAULT_EMAIL = "admin@ecoquest.dev"
DEFAULT_PASSWORD = "EcoAdmin123!"
DEFAULT_NAME = "EcoQuest Admin"


async def create_admin() -> None:
    """Create the initial Super Admin user if it doesn't already exist."""
    email = os.environ.get("ADMIN_EMAIL", DEFAULT_EMAIL).strip().lower()
    password = os.environ.get("ADMIN_PASSWORD", DEFAULT_PASSWORD)
    name = os.environ.get("ADMIN_NAME", DEFAULT_NAME)
    school_code = os.environ.get("ADMIN_SCHOOL_CODE", "ECO001")

    print("Creating admin user...")

    async with async_session_factory() as session:
        user_repo = UserRepository(session)

        email_hash = hashlib.sha256(email.encode("utf-8")).hexdigest()
        existing = await user_repo.get_by_email_hash(email_hash)
        if existing is not None:
            print(f"  Admin account {email} already exists, skipping.")
            return

        role = await user_repo.get_or_create_role(RoleName.SUPER_ADMIN)
        school = await user_repo.get_or_create_default_school(school_code)

        admin_user = User(
            school_id=school.school_id,
            role_id=role.role_id,
            name=name,
            email_encrypted=email,
            email_hash=email_hash,
            password_hash=hash_password(password),
            status=UserStatus.ACTIVE,
        )
        await user_repo.create(admin_user)
        await session.commit()

        print(f"  Created Super Admin: {email} / {password}")

    print("Done.")


if __name__ == "__main__":
    asyncio.run(create_admin())
