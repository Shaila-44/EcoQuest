from __future__ import annotations

"""EcoQuest API — AI Pipeline Schemas.

Data classes and Pydantic models for passing data between pipeline stages.
"""

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field


class AuthenticityFlags(BaseModel):
    """Flags indicating potential issues with image authenticity."""

    is_stock_photo: bool = Field(default=False, description="True if the photo appears to be a stock photo or graphic.")
    is_screen_photo: bool = Field(default=False, description="True if the image is a photo taken of a digital screen.")
    is_blurry: bool = Field(default=False, description="True if the image is too blurry or low quality to verify.")


class GeminiVisionResponseSchema(BaseModel):
    """Structured JSON schema enforced on Gemini Vision API responses."""

    is_verified: bool = Field(description="Whether the eco-activity requested in the challenge is visually confirmed in the image.")
    confidence_score: float = Field(ge=0.0, le=1.0, description="Visual certainty score between 0.0 and 1.0.")
    activity_detected: str = Field(description="Factual description of the observed visual evidence in the image.")
    environmental_impact: str = Field(default="", description="Brief explanation of the observed environmental benefit.")
    feedback: str = Field(default="", description="Encouragement or guidance message tailored for the student.")
    rejection_reason: Optional[str] = Field(default=None, description="Standardized rejection code if is_verified is False.")
    authenticity_flags: AuthenticityFlags = Field(default_factory=AuthenticityFlags)


@dataclass
class VerificationResult:
    """Result from the Gemini Vision verification stage."""

    is_verified: bool = False
    confidence_score: float = 0.0
    activity_detected: str = ""
    environmental_impact: str = ""
    feedback: str = ""
    rejection_reason: Optional[str] = None
    model_version: str = "gemini-2.0-flash"
    is_stock_photo: bool = False
    is_screen_photo: bool = False
    is_blurry: bool = False


@dataclass
class PipelineResult:
    """Result from the AI Verification pipeline."""

    verification: VerificationResult = field(default_factory=VerificationResult)
    processed_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    success: bool = False
    error: Optional[str] = None

