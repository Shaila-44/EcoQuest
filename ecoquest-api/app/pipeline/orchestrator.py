"""EcoQuest API — AI Pipeline Orchestrator.

Coordinates the preprocessing → OCR → verification pipeline.
"""

from app.pipeline.preprocessor import ImagePreprocessor
from app.pipeline.ocr import TextExtractor
from app.pipeline.verifier import GeminiVerifier
from app.pipeline.schemas import PipelineResult


class PipelineOrchestrator:
    """Orchestrates the full AI verification pipeline.

    Pipeline stages:
    1. OpenCV preprocessing (blur, resize, orientation, compress)
    2. EasyOCR text extraction (skip if no text)
    3. Gemini Vision verification (activity detection + confidence)
    """

    def __init__(
        self,
        preprocessor: ImagePreprocessor,
        ocr: TextExtractor,
        verifier: GeminiVerifier,
    ):
        self.preprocessor = preprocessor
        self.ocr = ocr
        self.verifier = verifier

    async def run(
        self,
        image_url: str,
        challenge_title: str,
        challenge_description: str,
        verification_prompt: str | None = None,
    ) -> PipelineResult:
        """Execute the full AI verification pipeline.

        TODO: Implement:
        1. Preprocess image (reject if too blurry)
        2. Extract text if present
        3. Send to Gemini for verification
        4. Assemble PipelineResult
        5. Handle errors at each stage gracefully
        """
        return PipelineResult()
