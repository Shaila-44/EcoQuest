"""EcoQuest API — Submission Repository."""

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.submission import Submission
from app.repositories.base import BaseRepository


class SubmissionRepository(BaseRepository[Submission]):
    """Data access layer for Submission operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(Submission, session)

    # TODO: Add custom queries:
    # - get_by_student_and_challenge(student_id, challenge_id)
    # - get_pending_for_school(school_id)
    # - count_by_student(student_id)
