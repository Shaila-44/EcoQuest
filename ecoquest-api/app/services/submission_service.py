"""EcoQuest API — Submission Service.

Handles submission creation, AI pipeline triggering, and status management.
"""

import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import SubmissionStatus
from app.models.submission import Submission
from app.pipeline.orchestrator import PipelineOrchestrator
from app.repositories.challenge_repo import ChallengeRepository
from app.repositories.submission_repo import SubmissionRepository
from app.schemas.submission import SubmissionCreate, SubmissionRead
from app.core.exceptions import NotFoundError


class SubmissionService:
    """Business logic for submission operations."""

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_submission(
        self, 
        data: SubmissionCreate, 
        user_id: uuid.UUID,
        orchestrator: PipelineOrchestrator
    ) -> SubmissionRead:
        """Create a submission and trigger AI verification."""
        repo = SubmissionRepository(self.session)
        
        submission = Submission(
            user_id=user_id,
            challenge_id=data.challenge_id,
            title=data.title,
            description=data.description,
            image_url=data.image_url,
            latitude=data.latitude,
            longitude=data.longitude,
            status=SubmissionStatus.PENDING,
            points_earned=0
        )
        created_submission = await repo.create(submission)
        
        # Trigger AI Pipeline (could be background task, but keeping it simple/sync for now)
        try:
            challenge_repo = ChallengeRepository(self.session)
            challenge = await challenge_repo.get_by_id(data.challenge_id)
            if not challenge:
                raise NotFoundError("Challenge", str(data.challenge_id))

            pipeline_result = await orchestrator.run(
                image_url=data.image_url,
                challenge_title=challenge.title,
                challenge_description=challenge.description or "",
            )

            # Correct attribute path: PipelineResult → VerificationResult → is_verified
            if pipeline_result.verification.is_verified:
                created_submission.status = SubmissionStatus.APPROVED
                created_submission.points_earned = challenge.points

                # Award points via GamificationService
                from app.services.gamification_service import GamificationService
                gamification = GamificationService(self.session)
                await gamification.award_points(user_id, challenge.points)

            else:
                created_submission.status = SubmissionStatus.REJECTED

            updated_submission = await repo.update(created_submission, {
                "status": created_submission.status,
                "points_earned": created_submission.points_earned
            })
            return SubmissionRead.model_validate(updated_submission)

        except NotFoundError:
            # Re-raise NotFoundError so the API returns 404
            raise
        except Exception:
            # Pipeline failures (network, AI API) — leave as PENDING for retry
            return SubmissionRead.model_validate(created_submission)


    async def get_submission(self, submission_id: uuid.UUID) -> SubmissionRead | None:
        """Fetch a submission."""
        repo = SubmissionRepository(self.session)
        submission = await repo.get_by_id(submission_id)
        if not submission:
            return None
        return SubmissionRead.model_validate(submission)

    async def list_student_submissions(self, user_id: uuid.UUID, challenge_id: uuid.UUID) -> list[SubmissionRead]:
        """List submissions for a specific student and challenge."""
        repo = SubmissionRepository(self.session)
        submissions = await repo.get_by_student_and_challenge(user_id, challenge_id)
        return [SubmissionRead.model_validate(s) for s in submissions]
