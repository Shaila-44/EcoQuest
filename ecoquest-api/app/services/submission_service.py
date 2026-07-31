"""EcoQuest API — Submission Service.

Handles submission creation, AI pipeline triggering, and status management.
"""

from sqlalchemy.ext.asyncio import AsyncSession


class SubmissionService:
    """Business logic for submission operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    # TODO: Implement:
    # - create_submission(data, student_id) -> SubmissionResponse
    # - get_submission(submission_id, user) -> SubmissionResponse
    # - list_submissions(filters, pagination, user) -> PaginatedResponse
    # - generate_upload_url(challenge_id, file_type) -> UploadUrlResponse
    # - cancel_submission(submission_id, user) -> None
