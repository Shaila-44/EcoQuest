from __future__ import annotations

"""EcoQuest API — Verification Decision Service.

Pure domain decision engine that evaluates AI results against platform thresholds.
Follows clean architecture:
- Receives AI response JSON / VerificationResult
- Validates formatting and checks confidence score thresholds
- Returns standardized decision outcome (APPROVED, PENDING, REJECTED)
- NO database access
- NO direct Gemini API communication
- NO XP or gamification calculations
"""

import json
import logging
from dataclasses import dataclass
from enum import Enum

from pydantic import ValidationError

from app.pipeline.schemas import GeminiVisionResponseSchema, VerificationResult

logger = logging.getLogger(__name__)


class VerificationDecision(str, Enum):
    """Standardized decision outcome for submission verification."""

    APPROVED = "APPROVED"
    PENDING = "PENDING"
    REJECTED = "REJECTED"


@dataclass
class DecisionResult:
    """Standardized verification decision result returned by VerificationService."""

    decision: VerificationDecision
    confidence_score: float
    is_verified: bool
    activity_detected: str
    environmental_impact: str
    feedback: str
    rejection_reason: str | None
    is_stock_photo: bool = False
    is_screen_photo: bool = False
    is_blurry: bool = False



class VerificationService:
    """Pure domain service that validates AI response JSON and enforces decision thresholds."""

    def __init__(
        self,
        base_approval_threshold: float = 0.85,
        low_trust_approval_threshold: float = 0.92,
        review_flag_threshold: float = 0.60,
    ):
        self.base_approval_threshold = base_approval_threshold
        self.low_trust_approval_threshold = low_trust_approval_threshold
        self.review_flag_threshold = review_flag_threshold

    def evaluate_response_json(
        self,
        raw_json_str: str,
        user_trust_score: float = 100.0,
    ) -> DecisionResult:
        """Parse raw JSON string from AI model and evaluate decision thresholds."""
        try:
            cleaned_json = raw_json_str.strip()
            if cleaned_json.startswith("```"):
                cleaned_json = cleaned_json.strip("`").removeprefix("json").strip()

            parsed_dict = json.loads(cleaned_json)
            validated_schema = GeminiVisionResponseSchema.model_validate(parsed_dict)

            verification_result = VerificationResult(
                is_verified=validated_schema.is_verified,
                confidence_score=validated_schema.confidence_score,
                activity_detected=validated_schema.activity_detected,
                environmental_impact=validated_schema.environmental_impact,
                feedback=validated_schema.feedback,
                rejection_reason=validated_schema.rejection_reason,
                is_stock_photo=validated_schema.authenticity_flags.is_stock_photo,
                is_screen_photo=validated_schema.authenticity_flags.is_screen_photo,
                is_blurry=validated_schema.authenticity_flags.is_blurry,
            )

            return self.evaluate_result(verification_result, user_trust_score=user_trust_score)

        except (json.JSONDecodeError, ValidationError) as exc:
            logger.error("Malformed AI JSON response received: %s", exc)
            return DecisionResult(
                decision=VerificationDecision.PENDING,
                confidence_score=0.0,
                is_verified=False,
                activity_detected="",
                environmental_impact="",
                feedback="AI response structure could not be parsed. Sent to teacher review.",
                rejection_reason="AI_SCHEMA_ERROR",
            )

    def evaluate_result(
        self,
        verification: VerificationResult,
        user_trust_score: float = 100.0,
    ) -> DecisionResult:
        """Evaluate a VerificationResult against dynamic trust thresholds and authenticity flags."""
        # 1. Evaluate Authenticity Flags
        if verification.is_stock_photo or verification.is_screen_photo or verification.is_blurry:
            reason = "STOCK_IMAGE_DETECTED" if verification.is_stock_photo else (
                "SCREEN_PHOTO" if verification.is_screen_photo else "POOR_QUALITY_BLURRY"
            )
            return DecisionResult(
                decision=VerificationDecision.REJECTED,
                confidence_score=verification.confidence_score,
                is_verified=False,
                activity_detected=verification.activity_detected,
                environmental_impact=verification.environmental_impact,
                feedback=verification.feedback or "Photo flagged for non-authentic visual traits.",
                rejection_reason=reason,
                is_stock_photo=verification.is_stock_photo,
                is_screen_photo=verification.is_screen_photo,
                is_blurry=verification.is_blurry,
            )

        # 2. Dynamic Threshold Selection based on Trust Score
        required_approval_threshold = (
            self.base_approval_threshold
            if user_trust_score >= 70.0
            else self.low_trust_approval_threshold
        )

        # 3. Decision Matrix Threshold Evaluation
        if verification.is_verified and verification.confidence_score >= required_approval_threshold:
            decision = VerificationDecision.APPROVED
            reason = None
        elif verification.confidence_score >= self.review_flag_threshold:
            decision = VerificationDecision.PENDING
            reason = verification.rejection_reason or "MEDIUM_CONFIDENCE_REVIEW"
        else:
            decision = VerificationDecision.REJECTED
            reason = verification.rejection_reason or "LOW_CONFIDENCE"

        return DecisionResult(
            decision=decision,
            confidence_score=verification.confidence_score,
            is_verified=verification.is_verified,
            activity_detected=verification.activity_detected,
            environmental_impact=verification.environmental_impact,
            feedback=verification.feedback,
            rejection_reason=reason,
            is_stock_photo=verification.is_stock_photo,
            is_screen_photo=verification.is_screen_photo,
            is_blurry=verification.is_blurry,
        )
