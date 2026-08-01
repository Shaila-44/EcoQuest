"""EcoQuest API — Database Seed Script.

Creates baseline demo data using the same repositories/services the app
uses at runtime: all four roles, a default school, demo teacher accounts,
demo student accounts, sample challenges, and a starter badge catalog.
Safe to run multiple times.

Usage: python -m scripts.seed
"""

import asyncio
import hashlib
from datetime import datetime, timedelta, timezone
import uuid

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import async_session_factory
from app.models.badge import Badge
from app.models.challenge import Challenge
from app.models.enums import RoleName, UserStatus
from app.models.user import User
from app.models.leaderboard import Leaderboard
from app.repositories.user_repo import UserRepository

DEMO_TEACHERS = [
    ("teacher1@ecoquest.com", "Teacher123!", "Demo Teacher 1"),
    ("teacher2@ecoquest.com", "Teacher123!", "Demo Teacher 2"),
]

DEMO_STUDENTS = [
    ("student1@ecoquest.com", "Student123!", "Demo Student 1"),
    ("student2@ecoquest.com", "Student123!", "Demo Student 2"),
    ("student3@ecoquest.com", "Student123!", "Demo Student 3"),
    ("student4@ecoquest.com", "Student123!", "Demo Student 4"),
    ("student5@ecoquest.com", "Student123!", "Demo Student 5"),
]

DEMO_CHALLENGES = [
    {
        "title": "Plant a Tree",
        "description": "Plant a sapling (or a potted plant) and take a clear photo of yourself with it in the ground or pot.",
        "category": "daily",
        "points": 50,
    },
    {
        "title": "Clean a Park",
        "description": "Pick up litter in your local park and take a photo of the filled trash bag.",
        "category": "weekly",
        "points": 100,
    },
    {
        "title": "Save Electricity",
        "description": "Unplug 3 devices not in use and submit a photo.",
        "category": "daily",
        "points": 30,
    },
    {
        "title": "Bring a Reusable Bottle",
        "description": "Take a photo of your reusable water bottle at school.",
        "category": "daily",
        "points": 20,
    },
    {
        "title": "Ride a Bicycle",
        "description": "Commute to school or the park on your bicycle.",
        "category": "weekly",
        "points": 150,
    },
]

async def seed() -> None:
    """Seed the database with baseline demo data."""
    async with async_session_factory() as session:
        user_repo = UserRepository(session)

        print("Seeding roles...")
        for role_name in RoleName:
            await user_repo.get_or_create_role(role_name)

        print("Seeding default school...")
        school = await user_repo.get_or_create_default_school("ECO001")

        teacher_role = await user_repo.get_or_create_role(RoleName.TEACHER)
        student_role = await user_repo.get_or_create_role(RoleName.STUDENT)

        print("Seeding demo teachers...")
        seeded_teachers = []
        for email, password, name in DEMO_TEACHERS:
            email_hash = hashlib.sha256(email.encode("utf-8")).hexdigest()
            teacher = await user_repo.get_by_email_hash(email_hash)
            if teacher is None:
                teacher = User(
                    school_id=school.school_id,
                    role_id=teacher_role.role_id,
                    name=name,
                    email_encrypted=email,
                    email_hash=email_hash,
                    password_hash=hash_password(password),
                    status=UserStatus.ACTIVE,
                )
                teacher = await user_repo.create(teacher)
                print(f"  Created {email}")
            else:
                print(f"  {email} already exists, skipping.")
            seeded_teachers.append(teacher)

        print("Seeding demo students...")
        seeded_students = []
        for email, password, name in DEMO_STUDENTS:
            email_hash = hashlib.sha256(email.encode("utf-8")).hexdigest()
            student = await user_repo.get_by_email_hash(email_hash)
            if student is None:
                student = User(
                    school_id=school.school_id,
                    role_id=student_role.role_id,
                    name=name,
                    email_encrypted=email,
                    email_hash=email_hash,
                    password_hash=hash_password(password),
                    status=UserStatus.ACTIVE,
                )
                student = await user_repo.create(student)
                print(f"  Created {email}")
            else:
                print(f"  {email} already exists, skipping.")
            seeded_students.append(student)

        print("Seeding demo challenges...")
        now = datetime.now(timezone.utc)
        for c_data in DEMO_CHALLENGES:
            existing = (
                (await session.execute(
                    select(Challenge).where(
                        Challenge.school_id == school.school_id,
                        Challenge.title == c_data["title"]
                    )
                )).scalars().first()
            )
            if existing is None:
                session.add(
                    Challenge(
                        school_id=school.school_id,
                        created_by=seeded_teachers[0].user_id,
                        title=c_data["title"],
                        description=c_data["description"],
                        category=c_data["category"],
                        points=c_data["points"],
                        start_date=now - timedelta(days=1),
                        end_date=now + timedelta(days=30),
                    )
                )
                print(f"  Created challenge '{c_data['title']}'")
            else:
                print(f"  Challenge '{c_data['title']}' already exists, skipping.")

        print("Seeding leaderboard...")
        for student in seeded_students:
            existing_lb = (
                (await session.execute(
                    select(Leaderboard).where(Leaderboard.user_id == student.user_id)
                )).scalars().first()
            )
            if existing_lb is None:
                session.add(
                    Leaderboard(
                        user_id=student.user_id,
                        total_points=0,
                        updated_at=now,
                    )
                )
                print(f"  Created leaderboard entry for {student.email_encrypted}")

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
            print("  Created demo badges.")
        else:
            print("  Badges already exist, skipping.")

        await session.commit()
        print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(seed())
