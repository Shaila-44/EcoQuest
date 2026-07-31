"""EcoQuest API — AI Pipeline Schemas.

Data classes for passing data between pipeline stages.
"""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class PreprocessingResult:
    """Result from the Pillow image preparation stage."""

    original_size: tuple[int, int] = (0, 0)
    processed_size: tuple[int, int] = (0, 0)
    processed_image_bytes: bytes = b""


@dataclass
class VerificationResult:
    """Result from the Gemini Vision verification stage."""

    is_verified: bool = False
    confidence_score: float = 0.0
    activity_detected: str = ""
    environmental_impact: str = ""
    feedback: str = ""
    rejection_reason: str | None = None
    model_version: str = ""


@dataclass
class PipelineResult:
    """Combined result from all pipeline stages."""

    preprocessing: PreprocessingResult = field(default_factory=PreprocessingResult)
    verification: VerificationResult = field(default_factory=VerificationResult)
    processed_at: datetime = field(default_factory=datetime.now)
    success: bool = False
    error: str | None = None
