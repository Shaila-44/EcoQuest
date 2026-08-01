import logging
import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.challenge import Challenge
from app.models.user import User
from app.repositories.challenge_repo import ChallengeRepository
from app.schemas.challenge import ChallengeCreate, ChallengeUpdate

logger = logging.getLogger(__name__)


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
        """Create a new challenge with transaction safety."""
        school_id = getattr(data, "school_id", None) or creator.school_id
        start_date = getattr(data, "start_date", None) or getattr(data, "starts_at", None)
        end_date = getattr(data, "end_date", None) or getattr(data, "ends_at", None)

        try:
            new_challenge = Challenge(
                title=data.title,
                description=data.description,
                category=data.category,
                points=data.points,
                school_id=school_id,
                created_by=creator.user_id,
                start_date=start_date,
                end_date=end_date,
            )

            created_challenge = await self.challenge_repo.create(new_challenge)
            await self.session.flush()
            return created_challenge
        except Exception as exc:
            logger.error("Transaction error during challenge creation: %s", exc)
            await self.session.rollback()
            if isinstance(exc, HTTPException):
                raise exc
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create challenge due to a database transaction error.",
            )

    async def get_challenge(self, challenge_id: uuid.UUID) -> Challenge:
        """Fetch a specific challenge by ID."""
        challenge = await self.challenge_repo.get_by_id(challenge_id)

        if not challenge:
            raise NotFoundError("Challenge", str(challenge_id))

        return challenge

    async def get_daily_challenge(
        self,
        school_id: uuid.UUID,
    ) -> Challenge | None:
        """Fetch today's daily challenge for a school."""
        challenge = await self.challenge_repo.get_daily_challenge(school_id)

        if not challenge:
            active_challenges = await self.challenge_repo.get_active_by_school(
                school_id
            )
            if active_challenges:
                return active_challenges[0]

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
        """Update an existing challenge with transaction safety."""
        challenge = await self.get_challenge(challenge_id)
        update_data = data.model_dump(exclude_unset=True)

        try:
            updated_challenge = await self.challenge_repo.update(challenge, update_data)
            await self.session.flush()
            return updated_challenge
        except Exception as exc:
            logger.error("Transaction error updating challenge %s: %s", challenge_id, exc)
            await self.session.rollback()
            if isinstance(exc, HTTPException):
                raise exc
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update challenge.",
            )

    async def delete_challenge(
        self,
        challenge_id: uuid.UUID,
        user: User,
    ) -> None:
        """Delete a challenge with transaction safety."""
        challenge = await self.get_challenge(challenge_id)
        try:
            await self.challenge_repo.delete(challenge)
            await self.session.flush()
        except Exception as exc:
            logger.error("Transaction error deleting challenge %s: %s", challenge_id, exc)
            await self.session.rollback()
            if isinstance(exc, HTTPException):
                raise exc
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete challenge.",
            )