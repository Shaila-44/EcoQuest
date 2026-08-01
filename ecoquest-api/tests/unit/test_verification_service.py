"""Unit tests — VerificationService Decision Engine."""

from app.pipeline.schemas import VerificationResult
from app.services.verification_service import (
    VerificationDecision,
    VerificationService,
)


def test_evaluate_valid_approved_json():
    service = VerificationService(base_approval_threshold=0.85)
    valid_json = """
    {
        "is_verified": true,
        "confidence_score": 0.95,
        "activity_detected": "Student planting sapling in soil",
        "environmental_impact": "Reforestation",
        "feedback": "Great job!",
        "rejection_reason": null,
        "authenticity_flags": {
            "is_stock_photo": false,
            "is_screen_photo": false,
            "is_blurry": false
        }
    }
    """
    res = service.evaluate_response_json(valid_json, user_trust_score=100.0)
    assert res.decision == VerificationDecision.APPROVED
    assert res.confidence_score == 0.95
    assert res.is_verified is True
    assert res.rejection_reason is None


def test_evaluate_malformed_json_returns_pending():
    service = VerificationService()
    invalid_json = "NOT_A_VALID_JSON{abc:"
    res = service.evaluate_response_json(invalid_json)
    assert res.decision == VerificationDecision.PENDING
    assert res.rejection_reason == "AI_SCHEMA_ERROR"


def test_evaluate_stock_photo_flag_rejects():
    service = VerificationService()
    v = VerificationResult(
        is_verified=True,
        confidence_score=0.99,
        is_stock_photo=True,
    )
    res = service.evaluate_result(v)
    assert res.decision == VerificationDecision.REJECTED
    assert res.rejection_reason == "STOCK_IMAGE_DETECTED"


def test_low_trust_score_elevates_approval_threshold():
    service = VerificationService(base_approval_threshold=0.85, low_trust_approval_threshold=0.92)
    v = VerificationResult(is_verified=True, confidence_score=0.88)

    # Normal trust score (100.0) approves at 0.88
    res_normal = service.evaluate_result(v, user_trust_score=100.0)
    assert res_normal.decision == VerificationDecision.APPROVED

    # Low trust score (50.0) requires 0.92 -> marks PENDING for review
    res_low_trust = service.evaluate_result(v, user_trust_score=50.0)
    assert res_low_trust.decision == VerificationDecision.PENDING
