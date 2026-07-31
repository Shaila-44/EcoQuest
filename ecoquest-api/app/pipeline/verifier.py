"""EcoQuest API — Gemini Vision Verifier.

Sends preprocessed images + prompt to Gemini Vision API
for eco-activity verification.
"""

from app.pipeline.schemas import VerificationResult


class GeminiVerifier:
    """Gemini Vision API client for activity verification."""

    def __init__(self, api_key: str, model: str = "gemini-2.0-flash"):
        self.api_key = api_key
        self.model = model

    async def verify(
        self,
        image_bytes: bytes,
        challenge_title: str,
        challenge_description: str,
        verification_prompt: str | None,
    ) -> VerificationResult:
        """Verify an eco-activity image using Gemini Vision.

        TODO: Implement:
        1. Construct structured prompt from template
        2. Send image + prompt to Gemini API
        3. Parse structured JSON response
        4. Return verification result
        """
        return VerificationResult()
