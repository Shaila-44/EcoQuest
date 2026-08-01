from __future__ import annotations

"""EcoQuest API — User Repository."""


from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import RoleName
from app.models.role import Role
from app.models.school import School
from app.models.user import User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    """Data access layer for User operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def get_by_email_hash(self, email_hash: str) -> User | None:
        """Fetch a user by email hash."""
        stmt = select(User).where(User.email_hash == email_hash)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
        
    async def get_by_phone_hash(self, phone_hash: str) -> User | None:
        """Fetch a user by phone hash."""
        stmt = select(User).where(User.phone_hash == phone_hash)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_role_by_name(self, role_name: RoleName) -> Role | None:
        """Fetch role entity by RoleName enum."""
        stmt = select(Role).where(Role.role_name == role_name)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_or_create_role(self, role_name: RoleName) -> Role:
        """Fetch existing role or create it if not present."""
        role = await self.get_role_by_name(role_name)
        if not role:
            role = Role(role_name=role_name, description=f"{role_name.value} role")
            self.session.add(role)
            await self.session.flush()
            await self.session.refresh(role)
        return role

    async def get_school_by_code(self, school_code: str) -> School | None:
        """Fetch school entity by school_code."""
        stmt = select(School).where(School.school_code == school_code)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_or_create_default_school(self, school_code: str | None = None) -> School:
        """Fetch existing school by code, or create default school if missing."""
        code = school_code or "DEFAULT"
        school = await self.get_school_by_code(code)
        if not school:
            school = School(
                school_code=code,
                school_name="Default EcoQuest School" if code == "DEFAULT" else f"School {code}",
            )
            self.session.add(school)
            await self.session.flush()
            await self.session.refresh(school)
        return school

