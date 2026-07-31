"""EcoQuest API — Challenge Service.

Handles challenge CRUD and daily challenge selection.
"""

from sqlalchemy.ext.asyncio import AsyncSession


class ChallengeService:
    """Business logic for challenge operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    # TODO: Implement:
    # - create_challenge(data, created_by) -> ChallengeRead
    # - update_challenge(challenge_id, data, user) -> ChallengeRead
    # - delete_challenge(challenge_id, user) -> None
    # - get_daily_challenge(school_id) -> ChallengeRead
    # - list_challenges(filters, pagination) -> PaginatedResponse
