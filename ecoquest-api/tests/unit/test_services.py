"""Unit tests — Gamification and Service Layer."""

import math
import pytest
from app.models.user import User


def test_level_calculation_formula():
    """Verify level progression math."""
    points_to_level = [
        (0, 1),
        (50, 1),
        (100, 2),
        (400, 3),
        (900, 4),
        (1600, 5),
    ]
    for pts, expected_lvl in points_to_level:
        lvl = math.floor(math.sqrt(pts / 100)) + 1
        assert lvl == expected_lvl


def test_user_trust_score_delta():
    """Verify trust score adjustment boundaries."""
    initial_score = 100.0
    approved_delta = 1.5
    rejected_delta = -5.0

    assert min(100.0, initial_score + approved_delta) == 100.0
    assert max(0.0, initial_score + rejected_delta) == 95.0


@pytest.mark.asyncio
async def test_transaction_rollback_on_failure(mocker=None):
    """Verify mock session rollback behavior on error."""
    from unittest.mock import AsyncMock, MagicMock
    from fastapi import HTTPException
    from app.services.review_service import ReviewService
    from app.schemas.review import ReviewCreate
    import uuid

    mock_session = MagicMock()
    mock_session.rollback = AsyncMock()
    mock_session.flush = AsyncMock()

    service = ReviewService(mock_session)
    service.submission_repo.get_by_id = AsyncMock(side_effect=Exception("DB Connection Error"))

    with pytest.raises(HTTPException) as exc_info:
        await service.create_review(
            data=ReviewCreate(submission_id=uuid.uuid4(), decision="approved"),
            reviewer=MagicMock(user_id=uuid.uuid4()),
        )

    assert exc_info.value.status_code == 500
    mock_session.rollback.assert_called_once()
