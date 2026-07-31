"""Unit tests — AI Pipeline."""

import pytest
from app.pipeline.prompts import build_verification_prompt
from app.pipeline.schemas import GeminiVisionResponseSchema, VerificationResult, PipelineResult


def test_build_verification_prompt_with_description():
    prompt = build_verification_prompt(
        challenge_title="Plant a Tree",
        challenge_description="Plant a sapling in your community.",
        user_description="Here is the sapling I planted!",
    )
    assert "CHALLENGE TITLE: Plant a Tree" in prompt
    assert "<student_description>" in prompt
    assert "Here is the sapling I planted!" in prompt


def test_gemini_vision_response_schema_validation():
    data = {
        "is_verified": True,
        "confidence_score": 0.95,
        "activity_detected": "A student planting a small sapling in soil",
        "environmental_impact": "Helps reforest the local park",
        "feedback": "Great work planting the sapling!",
        "rejection_reason": None,
        "authenticity_flags": {
            "is_stock_photo": False,
            "is_screen_photo": False,
            "is_blurry": False,
        },
    }
    schema = GeminiVisionResponseSchema.model_validate(data)
    assert schema.is_verified is True
    assert schema.confidence_score == 0.95
    assert schema.authenticity_flags.is_stock_photo is False


def test_pipeline_result_dataclass():
    res = PipelineResult(
        verification=VerificationResult(is_verified=True, confidence_score=0.90),
        success=True,
    )
    assert res.success is True
    assert res.verification.is_verified is True
    assert res.verification.confidence_score == 0.90
