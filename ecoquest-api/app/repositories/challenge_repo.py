from __future__ import annotations

"""EcoQuest API — Challenge Repository."""

import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.challenge import Challenge
from app.repositories.base import BaseRepository


class ChallengeRepository(BaseRepository[Challenge]):
    """Data access layer for Challenge operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(Challenge, session)

    async def get_active_by_school(self, school_id: uuid.UUID) -> list[Challenge]:
        """Fetch all active challenges for a school."""
        now = datetime.now()
        stmt = select(Challenge).where(
            Challenge.school_id == school_id,
            Challenge.start_date <= now,
            Challenge.end_date >= now
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_daily_challenge(self, school_id: uuid.UUID) -> Optional[Challenge]:

        """Fetch the daily challenge for a school (assuming 'daily' category)."""
        now = datetime.now()
        stmt = select(Challenge).where(
            Challenge.school_id == school_id,
            Challenge.category == "daily",
            Challenge.start_date <= now,
            Challenge.end_date >= now
        ).limit(1)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
