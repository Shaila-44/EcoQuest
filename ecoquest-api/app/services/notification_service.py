"""EcoQuest API — Notification Service.

Future: email/push notifications for submission status changes,
badge awards, and teacher review requests.
"""

from sqlalchemy.ext.asyncio import AsyncSession


class NotificationService:
    """Business logic for notifications (future implementation)."""

    def __init__(self, session: AsyncSession):
        self.session = session

    # TODO: Implement:
    # - notify_submission_reviewed(submission_id) -> None
    # - notify_badge_earned(user_id, badge_id) -> None
    # - notify_new_challenge(challenge_id, school_id) -> None
