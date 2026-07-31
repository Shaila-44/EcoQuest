"""EcoQuest API — AI Pipeline Schemas.

Data classes for passing data between pipeline stages.
"""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class PreprocessingResult:
    """Result from the OpenCV preprocessing stage."""

    blur_score: float = 0.0
    is_blurry: bool = False
    original_size: tuple[int, int] = (0, 0)
    processed_size: tuple[int, int] = (0, 0)
    processed_image_path: str = ""


@dataclass
class OCRResult:
    """Result from the EasyOCR text extraction stage."""

    text_detected: bool = False
    extracted_text: str | None = None


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
    ocr: OCRResult = field(default_factory=OCRResult)
    verification: VerificationResult = field(default_factory=VerificationResult)
    processed_at: datetime = field(default_factory=datetime.now)
    success: bool = False
    error: str | None = None
