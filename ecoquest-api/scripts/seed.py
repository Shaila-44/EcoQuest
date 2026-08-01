"""EcoQuest API — Database Seed Script.

Creates baseline demo data using the same repositories/services the app
uses at runtime: all four roles, a default school, a demo teacher account
(owner of the seeded challenge), a sample challenge, and a starter badge
catalog. Safe to run multiple times — every step checks for existing data
before inserting.

Usage: python scripts/seed.py
"""

import asyncio
import hashlib
from datetime import datetime, timedelta, timezone

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import async_session_factory
from app.models.badge import Badge
from app.models.challenge import Challenge
from app.models.enums import RoleName, UserStatus
from app.models.user import User
from app.repositories.user_repo import UserRepository

DEMO_TEACHER_EMAIL = "teacher@ecoquest.dev"
DEMO_TEACHER_PASSWORD = "EcoTeacher123!"


async def seed() -> None:
    """Seed the database with baseline demo data."""
    async with async_session_factory() as session:
        user_repo = UserRepository(session)

        print("Seeding roles...")
        for role_name in RoleName:
            await user_repo.get_or_create_role(role_name)

        print("Seeding default school...")
        school = await user_repo.get_or_create_default_school("ECO001")

        print("Seeding demo teacher account...")
        email_hash = hashlib.sha256(DEMO_TEACHER_EMAIL.encode("utf-8")).hexdigest()
        teacher = await user_repo.get_by_email_hash(email_hash)
        if teacher is None:
            teacher_role = await user_repo.get_or_create_role(RoleName.TEACHER)
            teacher = User(
                school_id=school.school_id,
                role_id=teacher_role.role_id,
                name="Demo Teacher",
                email_encrypted=DEMO_TEACHER_EMAIL,
                email_hash=email_hash,
                password_hash=hash_password(DEMO_TEACHER_PASSWORD),
                status=UserStatus.ACTIVE,
            )
            teacher = await user_repo.create(teacher)
            print(f"  Created {DEMO_TEACHER_EMAIL} / {DEMO_TEACHER_PASSWORD}")
        else:
            print(f"  {DEMO_TEACHER_EMAIL} already exists, skipping.")

        print("Seeding badges...")
        existing_badges = (await session.execute(select(Badge))).scalars().first()
        if existing_badges is None:
            session.add_all(
                [
                    Badge(
                        badge_name="Tree Planter",
                        description="Planted your first tree",
                        points=50,
                        icon_url="/badges/tree.png",
                        criteria={"required_submissions": 1},
                    ),
                    Badge(
                        badge_name="Recycling Hero",
                        description="Completed 3 approved eco-submissions",
                        points=75,
                        icon_url="/badges/recycle.png",
                        criteria={"required_submissions": 3},
                    ),
                    Badge(
                        badge_name="Eco Warrior",
                        description="Completed 10 approved eco-submissions",
                        points=200,
                        icon_url="/badges/warrior.png",
                        criteria={"required_submissions": 10},
                    ),
                ]
            )
        else:
            print("  Badges already exist, skipping.")

        print("Seeding sample challenge...")
        existing_challenge = (
            (await session.execute(select(Challenge).where(Challenge.school_id == school.school_id)))
            .scalars()
            .first()
        )
        if existing_challenge is None:
            now = datetime.now(timezone.utc)
            session.add(
                Challenge(
                    school_id=school.school_id,
                    created_by=teacher.user_id,
                    title="Plant a Tree",
                    description=(
                        "Plant a sapling (or a potted plant) and take a clear photo of "
                        "yourself with it in the ground or pot."
                    ),
                    category="daily",
                    points=50,
                    start_date=now - timedelta(days=1),
                    end_date=now + timedelta(days=30),
                )
            )
        else:
            print("  A challenge already exists for the default school, skipping.")

        await session.commit()
        print("Seeding complete.")


if __name__ == "__main__":
    asyncio.run(seed())
