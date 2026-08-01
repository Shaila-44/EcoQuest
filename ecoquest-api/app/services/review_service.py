async def create_review(
    self,
    data: ReviewCreate,
    reviewer: User,
) -> Review:
    """Create a teacher review and update submission status atomically."""
    try:
        submission = await self.submission_repo.get_by_id(data.submission_id)

        if not submission:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Submission not found.",
            )

        new_status = (
            SubmissionStatus.APPROVED
            if data.decision.lower() in ("approved", "verified")
            else SubmissionStatus.REJECTED
        )

        submission.status = new_status

        if new_status == SubmissionStatus.APPROVED:
            points = (
                data.points_override
                if data.points_override is not None
                else 10
            )

            submission.points_earned = points

            await self.gamification_service.award_points(
                submission.user,
                points,
            )

            await self.leaderboard_service.update_leaderboard_entry(
                submission.user_id,
                submission.user.school_id,
                points,
            )

        await self.submission_repo.update(
            submission,
            {
                "status": new_status,
                "points_earned": submission.points_earned,
            },
        )

        new_review = Review(
            submission_id=data.submission_id,
            reviewer_id=reviewer.user_id,
            decision=data.decision,
            comment=data.comment,
            points_override=data.points_override,
        )

        created_review = await self.review_repo.create(new_review)

        await self.session.flush()

        logger.info(
            "Created review %s for submission %s by reviewer %s",
            created_review.review_id,
            data.submission_id,
            reviewer.user_id,
        )

        return created_review

    except Exception as exc:
        logger.error(
            "Transaction error during review creation, rolling back: %s",
            exc,
        )
        await self.session.rollback()

        if isinstance(exc, HTTPException):
            raise

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save review due to a transaction error.",
        )


async def get_pending_reviews(
    self,
    school_id: uuid.UUID,
) -> list[Submission]:
    """Fetch all submissions awaiting teacher review for a school."""
    return await self.submission_repo.get_pending_for_school(school_id)


async def get_review_history(
    self,
    submission_id: uuid.UUID,
) -> list[Review]:
    """Get review history for a submission."""
    return await self.review_repo.get_by_submission(submission_id)
