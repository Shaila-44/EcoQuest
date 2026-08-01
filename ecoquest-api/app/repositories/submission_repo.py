"""EcoQuest API — Submission Repository."""

import uuid
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.enums import SubmissionStatus
from app.models.submission import Submission
from app.repositories.base import BaseRepository


class SubmissionRepository(BaseRepository[Submission]):
    """Data access layer for Submission operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(Submission, session)

    async def get_by_id(self, id: uuid.UUID) -> Submission | None:
        """Fetch a submission by primary key with the owning user preloaded (avoids async lazy-load errors)."""
        stmt = (
            select(Submission)
            .options(selectinload(Submission.user))
            .where(Submission.submission_id == id)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_challenge(self, challenge_id: uuid.UUID) -> list[Submission]:
        """Fetch all submissions for a specific challenge, across all students."""
        stmt = select(Submission).where(Submission.challenge_id == challenge_id)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_by_student_and_challenge(self, student_id: uuid.UUID, challenge_id: uuid.UUID) -> list[Submission]:
        """Fetch all submissions for a specific student and challenge."""
        stmt = select(Submission).where(
            Submission.user_id == student_id,
            Submission.challenge_id == challenge_id
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_pending_for_school(self, school_id: uuid.UUID) -> list[Submission]:
        """Fetch all pending submissions for a school's teachers to review."""
        stmt = (
            select(Submission)
            .join(Submission.user)
            .where(
                Submission.status == SubmissionStatus.PENDING,
                Submission.user.has(school_id=school_id)
            )
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def count_by_student(self, student_id: uuid.UUID) -> int:
        """Count total submissions by a student."""
        stmt = select(func.count(Submission.submission_id)).where(Submission.user_id == student_id)
        result = await self.session.execute(stmt)
        return result.scalar_one() or 0
