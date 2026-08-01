"""EcoQuest API — Challenge Service.

Handles challenge CRUD and daily challenge selection.
"""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.challenge_repo import ChallengeRepository
from app.schemas.challenge import ChallengeCreate, ChallengeRead, ChallengeUpdate
from app.models.challenge import Challenge
from app.core.exceptions import NotFoundError


class ChallengeService:
    """Business logic for challenge operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_challenge(self, data: ChallengeCreate, created_by: uuid.UUID, school_id: uuid.UUID) -> ChallengeRead:
        """Create a new challenge."""
        repo = ChallengeRepository(self.session)
        challenge = Challenge(
            title=data.title,
            description=data.description,
            category=data.category,
            points=data.points,
            start_date=data.start_date,
            end_date=data.end_date,
            created_by=created_by,
            school_id=school_id
        )
        created_challenge = await repo.create(challenge)
        return ChallengeRead.model_validate(created_challenge)

    async def update_challenge(self, challenge_id: uuid.UUID, data: ChallengeUpdate) -> ChallengeRead:
        """Update a challenge."""
        repo = ChallengeRepository(self.session)
        challenge = await repo.get_by_id(challenge_id)
        if not challenge:
            raise NotFoundError("Challenge", str(challenge_id))
        updated_challenge = await repo.update(challenge, data.model_dump(exclude_unset=True))
        return ChallengeRead.model_validate(updated_challenge)

    async def delete_challenge(self, challenge_id: uuid.UUID) -> None:
        """Delete a challenge."""
        repo = ChallengeRepository(self.session)
        challenge = await repo.get_by_id(challenge_id)
        if not challenge:
            raise NotFoundError("Challenge", str(challenge_id))
        await repo.delete(challenge)

    async def get_daily_challenge(self, school_id: uuid.UUID) -> ChallengeRead | None:
        """Get the daily challenge for a school."""
        repo = ChallengeRepository(self.session)
        challenge = await repo.get_daily_challenge(school_id)
        if not challenge:
            return None
        return ChallengeRead.model_validate(challenge)

    async def list_active_challenges(self, school_id: uuid.UUID) -> list[ChallengeRead]:
        """List active challenges for a school."""
        repo = ChallengeRepository(self.session)
        challenges = await repo.get_active_by_school(school_id)
        return [ChallengeRead.model_validate(c) for c in challenges]
