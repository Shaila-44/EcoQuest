"""EcoQuest API — Submission Service.

Workflow Coordinator for EcoQuest Submissions.
Implements production error resilience, duplicate detection, atomic transaction rollbacks,
and structured logging.
"""

import logging
import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.core.exceptions import DuplicateError
from app.models.ai_verification import AIVerification
from app.models.enums import SubmissionStatus, VerificationStatus
from app.models.submission import Submission
from app.models.user import User
from app.pipeline.orchestrator import PipelineOrchestrator
from app.pipeline.verifier import GeminiVerifier
from app.repositories.challenge_repo import ChallengeRepository
from app.repositories.submission_repo import SubmissionRepository
from app.repositories.challenge_repo import ChallengeRepository
from app.repositories.submission_repo import SubmissionRepository
from app.repositories.user_repo import UserRepository

from app.schemas.submission import SubmissionCreate, SubmissionRead

from app.services.gamification_service import GamificationService
from app.storage.cloudinary import CloudinaryStorage

from app.core.exceptions import DuplicateError, NotFoundError

logger = logging.getLogger(__name__)


class SubmissionService:
    """Workflow Coordinator for student submission lifecycle."""

    def __init__(
        self,
        session: AsyncSession,
        orchestrator: PipelineOrchestrator | None = None,
        gamification_service: GamificationService | None = None,
    ):
        self.session = session
        self.submission_repo = SubmissionRepository(session)
        self.challenge_repo = ChallengeRepository(session)
        self.user_repo = UserRepository(session)
        self.gamification_service = gamification_service or GamificationService(session)

        verifier = GeminiVerifier(
            api_key=settings.GEMINI_API_KEY,
            model=settings.GEMINI_MODEL,
        )
        self.orchestrator = orchestrator or PipelineOrchestrator(verifier)
        self.storage = CloudinaryStorage(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
        )

    def validate_image_url(self, image_url: str) -> None:
        """Validate image URL format and protocol."""
        if not image_url or not (image_url.startswith("http://") or image_url.startswith("https://")):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid image URL format. Must be a valid HTTP/HTTPS URL.",
            )

    async def check_duplicate_submission(self, student_id: uuid.UUID, challenge_id: uuid.UUID) -> None:
        """Check if student has already completed or submitted for this challenge."""
        existing_submissions = await self.submission_repo.get_by_student_and_challenge(
            student_id=student_id,
            challenge_id=challenge_id,
        )
        for sub in existing_submissions:
            if sub.status in (SubmissionStatus.APPROVED, SubmissionStatus.PENDING):
                logger.warning(
                    "Duplicate submission attempt by user %s for challenge %s",
                    student_id,
                    challenge_id,
                )
                raise DuplicateError(
                    message="You have already submitted a photo for this challenge.",
                    details={"challenge_id": str(challenge_id), "existing_status": sub.status.value},
                )

    async def create_submission(self, data: SubmissionCreate, student: User) -> Submission:
        """Coordinate complete submission creation with atomic database transaction rollback protection."""
        logger.info(
            "Creating submission for student %s on challenge %s",
            student.user_id,
            data.challenge_id,
        )

        # 1. Validate payload & check duplicate submission
        self.validate_image_url(data.image_url)
        await self.check_duplicate_submission(student.user_id, data.challenge_id)

        challenge = await self.challenge_repo.get_by_id(data.challenge_id)
        if not challenge:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Challenge not found.",
            )

        try:
            # 2. Call PipelineOrchestrator for AI Verification
            pipeline_result = await self.orchestrator.run(
                image_url=data.image_url,
                challenge_title=challenge.title,
                challenge_description=challenge.description or challenge.title,
                user_description=data.description,
                user_trust_score=student.trust_score,
            )

            verification = pipeline_result.verification

            # 3. Map Verification Outcome to Submission & AI Status
            if verification.is_verified and verification.confidence_score >= 0.60:
                final_sub_status = SubmissionStatus.APPROVED
                final_verif_status = VerificationStatus.APPROVED
                points_earned = challenge.points if challenge.points > 0 else 10
            elif verification.confidence_score >= 0.50 or not pipeline_result.success:
                final_sub_status = SubmissionStatus.PENDING
                final_verif_status = VerificationStatus.PENDING
                points_earned = 0
            else:
                final_sub_status = SubmissionStatus.REJECTED
                final_verif_status = VerificationStatus.REJECTED
                points_earned = 0

            # 4. Store Submission Entity
            new_submission = Submission(
                user_id=student.user_id,
                challenge_id=challenge.challenge_id,
                title=challenge.title,
                description=data.description,
                image_url=data.image_url,
                status=final_sub_status,
                points_earned=points_earned,
            )
            self.session.add(new_submission)
            await self.session.flush()

            # 5. Save AI Verification Entity
            ai_verif_record = AIVerification(
                submission_id=new_submission.submission_id,
                ai_score=verification.confidence_score,
                final_status=final_verif_status,
                verified_at=new_submission.submitted_at,
            )
            self.session.add(ai_verif_record)

            # 6. Delegate Gamification Rewards when Approved
            total_sub_count = await self.submission_repo.count_by_student(student.user_id)
            await self.gamification_service.process_all_rewards(
                user=student,
                points_awarded=points_earned,
                is_approved=(final_sub_status == SubmissionStatus.APPROVED),
                confidence_score=verification.confidence_score,
                total_submissions=total_sub_count + 1,
            )

            await self.session.flush()
            logger.info("Successfully created submission %s (status=%s)", new_submission.submission_id, final_sub_status.value)
            return new_submission

        except Exception as exc:
            logger.error("Transaction error during submission creation, performing rollback: %s", exc)
            await self.session.rollback()
            if isinstance(exc, (HTTPException, DuplicateError)):
                raise exc
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save submission due to a system transaction error.",
            )

    async def get_submission(self, submission_id: uuid.UUID) -> Submission:
        """Fetch submission details."""
        sub = await self.submission_repo.get_by_id(submission_id)
        if not sub:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Submission not found.",
            )
        return sub

    async def list_submissions(
        self,
        student_id: uuid.UUID | None = None,
        offset: int = 0,
        limit: int = 20,
    ) -> list[Submission]:
        """List submissions with optional student filter."""
        filters = {}
        if student_id:
            filters["user_id"] = student_id
        return await self.submission_repo.list(offset=offset, limit=limit, filters=filters)

    async def generate_upload_url(self, folder: str = "ecoquest/submissions", public_id: str | None = None) -> dict:
        """Generate a Cloudinary presigned upload signature."""
        pid = public_id or f"sub_{uuid.uuid4().hex[:12]}"
        return await self.storage.generate_upload_url(
            folder=folder,
            public_id=pid,
            allowed_formats=["jpg", "png", "webp"],
        )

    async def cancel_submission(self, submission_id: uuid.UUID, user: User) -> None:
        """Cancel a pending submission."""
        sub = await self.get_submission(submission_id)
        if sub.user_id != user.user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to cancel this submission.",
            )
        if sub.status != SubmissionStatus.PENDING:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Can only cancel pending submissions.",
            )
        await self.submission_repo.delete(sub)
