"""EcoQuest API — Challenge Service.

Handles challenge CRUD and daily challenge selection.
"""

import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.challenge import Challenge
from app.models.user import User
from app.repositories.challenge_repo import ChallengeRepository
from app.schemas.challenge import ChallengeCreate, ChallengeUpdate


class ChallengeService:
    """Business logic for challenge operations."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.challenge_repo = ChallengeRepository(session)

    async def create_challenge(
        self,
        data: ChallengeCreate,
        creator: User,
    ) -> Challenge:
        """Create a new challenge."""
        school_id = data.school_id or creator.school_id

        new_challenge = Challenge(
            title=data.title,
            description=data.description,
            category=data.category,
            points=data.points,
            school_id=school_id,
            created_by=creator.user_id,
            start_date=data.starts_at,
            end_date=data.ends_at,
        )

        return await self.challenge_repo.create(new_challenge)

    async def get_challenge(self, challenge_id: uuid.UUID) -> Challenge:
        """Fetch a specific challenge by ID."""
        challenge = await self.challenge_repo.get_by_id(challenge_id)

        if not challenge:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Challenge not found.",
            )

        return challenge

    async def get_daily_challenge(
        self,
        school_id: uuid.UUID,
    ) -> Challenge | None:
        """Fetch today's daily challenge for a school."""
        challenge = await self.challenge_repo.get_daily_challenge(school_id)

        if not challenge:
            # Fallback: get any active challenge for the school
            active_challenges = await self.challenge_repo.get_active_by_school(
                school_id
            )
            if active_challenges:
                return active_challenges[0]

            # Ultimate fallback: return any existing challenge
            all_challenges = await self.challenge_repo.list(limit=1)
            return all_challenges[0] if all_challenges else None

        return challenge

    async def list_challenges(
        self,
        school_id: uuid.UUID | None = None,
        offset: int = 0,
        limit: int = 20,
    ) -> list[Challenge]:
        """Fetch active or school challenges."""
        if school_id:
            return await self.challenge_repo.get_active_by_school(school_id)

        return await self.challenge_repo.list(offset=offset, limit=limit)

    async def update_challenge(
        self,
        challenge_id: uuid.UUID,
        data: ChallengeUpdate,
        user: User,
    ) -> Challenge:
        """Update an existing challenge."""
        challenge = await self.get_challenge(challenge_id)

        update_data = data.model_dump(exclude_unset=True)

        return await self.challenge_repo.update(challenge, update_data)

    async def delete_challenge(
        self,
        challenge_id: uuid.UUID,
        user: User,
    ) -> None:
        """Delete a challenge."""
        challenge = await self.get_challenge(challenge_id)
        await self.challenge_repo.delete(challenge)