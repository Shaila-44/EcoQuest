"""EcoQuest API — AI Pipeline Orchestrator.

Coordinates the image preparation → Gemini verification pipeline.
"""

from app.pipeline.preprocessor import ImagePreprocessor
from app.pipeline.verifier import GeminiVerifier
from app.pipeline.schemas import PipelineResult


class PipelineOrchestrator:
    """Orchestrates the AI verification pipeline.

    Pipeline stages:
    1. Pillow image preparation (EXIF orientation, resize, compress)
    2. Gemini Vision verification (image understanding)
    """

    def __init__(
        self,
        preprocessor: ImagePreprocessor,
        verifier: GeminiVerifier,
    ):
        self.preprocessor = preprocessor
        self.verifier = verifier

    async def run(
        self,
        image_bytes: bytes,
        challenge_title: str,
        challenge_description: str,
        verification_prompt: str | None = None,
    ) -> PipelineResult:
        """Execute the AI verification pipeline.

        TODO: Implement:
        1. Prepare image
        2. Send to Gemini for verification
        3. Assemble PipelineResult
        4. Handle errors at each stage gracefully
        """
        return PipelineResult()
