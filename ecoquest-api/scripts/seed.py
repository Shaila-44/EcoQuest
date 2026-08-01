from __future__ import annotations

"""EcoQuest API — Database Seed Script.

Seeds standard school and management-provisioned user accounts with Argon2id password hashes.
Usage: python scripts/seed.py
"""

import asyncio
import hashlib

from app.core.security import hash_password
from app.db.session import async_session_factory, engine
from app.models.base import Base
from app.models.enums import RoleName, UserStatus
from app.models.role import Role
from app.models.school import School
from app.models.user import User


async def seed() -> None:
    """Seed default management credentials into the database."""
    print("🌱 Seeding EcoQuest database with management-provisioned credentials...")

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as session:

        # 1. Create or get Default School (ECO001 and 001)
        from sqlalchemy import select
        schools_data = [
            ("001", "School 001"),
            ("ECO001", "Default EcoQuest Academy"),
        ]
        school_objs = {}
        for s_code, s_name in schools_data:
            stmt_school = select(School).where(School.school_code == s_code)
            res_school = await session.execute(stmt_school)
            s_entity = res_school.scalar_one_or_none()
            if not s_entity:
                s_entity = School(
                    school_code=s_code,
                    school_name=s_name,
                    address="123 Eco Way",
                    city="Green City",
                    state="Eco State",
                    pincode="100001",
                )
                session.add(s_entity)
                await session.flush()
                print(f"  ✓ Created School: {s_entity.school_name} (Code: {s_entity.school_code}, ID: {s_entity.school_id})")
            school_objs[s_code] = s_entity

        school = school_objs["ECO001"]

        # 2. Roles definition
        roles_data = [
            (RoleName.STUDENT, "Student Role"),
            (RoleName.TEACHER, "Teacher Role"),
            (RoleName.SCHOOL_ADMIN, "School Admin Role"),
            (RoleName.SUPER_ADMIN, "Super Admin Role"),
        ]
        role_objs = {}
        for r_name, r_desc in roles_data:
            stmt_r = select(Role).where(Role.role_name == r_name)
            res_r = await session.execute(stmt_r)
            r_obj = res_r.scalar_one_or_none()
            if not r_obj:
                r_obj = Role(role_name=r_name, description=r_desc)
                session.add(r_obj)
                await session.flush()
            role_objs[r_name] = r_obj

        # 3. Management-provisioned User Accounts
        users_to_seed = [
            {
                "email": "123@ecoquest.org",
                "student_id": "123",
                "password": "admin@123",
                "name": "Student 123",
                "role": RoleName.STUDENT,
                "school_code": "001",
            },
            {
                "email": "student@ecoquest.org",
                "student_id": "student",
                "password": "Student123!",
                "name": "Sample Student",
                "role": RoleName.STUDENT,
                "school_code": "ECO001",
            },
            {
                "email": "teacher@ecoquest.org",
                "student_id": "teacher",
                "password": "Teacher123!",
                "name": "Sample Teacher",
                "role": RoleName.TEACHER,
                "school_code": "ECO001",
            },
            {
                "email": "schooladmin@ecoquest.org",
                "student_id": "schooladmin",
                "password": "SchoolAdmin123!",
                "name": "Sample School Admin",
                "role": RoleName.SCHOOL_ADMIN,
                "school_code": "ECO001",
            },
            {
                "email": "admin@ecoquest.org",
                "student_id": "admin",
                "password": "SuperAdmin123!",
                "name": "System Super Admin",
                "role": RoleName.SUPER_ADMIN,
                "school_code": "ECO001",
            },
        ]


        for u_info in users_to_seed:
            email_clean = u_info["email"].lower().strip()
            email_hash = hashlib.sha256(email_clean.encode("utf-8")).hexdigest()

            stmt_u = select(User).where(User.email_hash == email_hash)
            res_u = await session.execute(stmt_u)
            existing_u = res_u.scalar_one_or_none()

            if not existing_u:
                pwd_hash = hash_password(u_info["password"])
                role_entity = role_objs[u_info["role"]]
                target_school = school_objs.get(u_info.get("school_code", "ECO001"), school)
                new_user = User(
                    school_id=target_school.school_id,
                    role_id=role_entity.role_id,
                    name=u_info["name"],
                    email_encrypted=email_clean,
                    email_hash=email_hash,
                    password_hash=pwd_hash,
                    status=UserStatus.ACTIVE,
                )
                session.add(new_user)
                await session.flush()
                print(
                    f"  ✓ Provisioned Account: {u_info['name']} | Role: {u_info['role'].value} | "
                    f"Email/ID: {email_clean} | School Code: {target_school.school_code} | Student UUID: {new_user.user_id}"
                )
            else:
                print(f"  • Account already exists: {email_clean} (UUID: {existing_u.user_id})")


        await session.commit()
        print("\n✨ Database seeding completed successfully!")


if __name__ == "__main__":
    asyncio.run(seed())
