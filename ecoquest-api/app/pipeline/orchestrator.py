"""EcoQuest API — AI Pipeline Orchestrator.

Coordinates the Gemini Vision verification pipeline.
"""

from app.pipeline.verifier import GeminiVerifier
from app.pipeline.schemas import PipelineResult


class PipelineOrchestrator:
    """Orchestrates the AI verification pipeline using Gemini Vision."""

    def __init__(
        self,
        verifier: GeminiVerifier,
    ):
        self.verifier = verifier

    async def run(
        self,
        image_url: str,
        challenge_title: str,
        challenge_description: str,
        verification_prompt: str | None = None,
    ) -> PipelineResult:
        """Execute the AI verification pipeline.

        TODO: Implement:
        1. Download image from Cloudinary URL
        2. Send to Gemini for verification
        3. Assemble PipelineResult
        4. Handle errors gracefully
        """
        return PipelineResult()
