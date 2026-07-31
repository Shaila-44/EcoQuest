"""EcoQuest API — Review Service.

Handles teacher review workflow: approve, reject, request resubmission.
"""

from sqlalchemy.ext.asyncio import AsyncSession


class ReviewService:
    """Business logic for review operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    # TODO: Implement:
    # - create_review(data, reviewer_id) -> ReviewRead
    # - get_pending_reviews(school_id, pagination) -> PaginatedResponse
    # - get_review_history(submission_id) -> list[ReviewRead]
