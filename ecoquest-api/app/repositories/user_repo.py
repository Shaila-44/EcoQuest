from __future__ import annotations

"""EcoQuest API — User Repository."""

import uuid
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.enums import RoleName
from app.models.role import Role
from app.models.school import School
from app.models.user import User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    """Data access layer for User operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def get_by_id(
        self,
        id: uuid.UUID,
    ) -> User | None:
        """Fetch a user by primary key with role preloaded."""
        stmt = (
            select(User)
            .options(selectinload(User.role))
            .where(User.user_id == id)
        )

        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()


    async def get_by_email_hash(
        self,
        email_hash: str,
    ) -> User | None:
        """Fetch a user by email hash with role preloaded."""
        stmt = (
            select(User)
            .options(selectinload(User.role))
            .where(User.email_hash == email_hash)
        )

        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
    async def get_by_phone_hash(self, phone_hash: str) -> Optional[User]:
        """Fetch a user by phone hash."""
        stmt = select(User).where(User.phone_hash == phone_hash)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()


    async def get_or_create_role(self, role_name: RoleName) -> Role:
        """Fetch role by enum name or create if missing."""
        stmt = select(Role).where(Role.role_name == role_name)
        res = await self.session.execute(stmt)
        role = res.scalar_one_or_none()
        if not role:
            role = Role(role_name=role_name, description=f"{role_name.value} Role")
            self.session.add(role)
            await self.session.flush()
        return role

    async def get_or_create_default_school(self, school_code: Optional[str] = None) -> School:
        """Fetch school by code or retrieve/create default school."""
        if school_code:
            stmt = select(School).where(School.school_code == school_code)
            res = await self.session.execute(stmt)
            school = res.scalar_one_or_none()
            if school:
                return school

        stmt_any = select(School).limit(1)
        res_any = await self.session.execute(stmt_any)
        school = res_any.scalar_one_or_none()
        if not school:
            school = School(school_code="ECO001", school_name="Default EcoQuest Academy", address="Online")
            self.session.add(school)
            await self.session.flush()
        return school

