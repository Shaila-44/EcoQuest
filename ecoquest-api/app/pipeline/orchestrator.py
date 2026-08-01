"""EcoQuest API — Production AI Pipeline Orchestrator.

Coordinates image acquisition, format/size validation, pre-processing,
Gemini Vision client execution, and VerificationService decision evaluation.
"""

import io
import logging
import httpx
from PIL import Image

from app.core.exceptions import PipelineError, ValidationError
from app.pipeline.schemas import PipelineResult, VerificationResult
from app.pipeline.verifier import BaseVisionVerifier, GeminiVerifier
from app.services.verification_service import DecisionResult, VerificationDecision, VerificationService

logger = logging.getLogger(__name__)

# Max file size limit: 10 MB (10,485,760 bytes)
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

# Magic byte signatures for image format validation
MAGIC_BYTES = {
    b"\xff\xd8\xff": "image/jpeg",
    b"\x89PNG\r\n\x1a\n": "image/png",
    b"RIFF": "image/webp",
}


class PipelineOrchestrator:
    """Orchestrates image downloading, magic byte validation, dimension optimization, AI execution, and decision threshold evaluation."""

    def __init__(
        self,
        verifier: BaseVisionVerifier | None = None,
        verification_service: VerificationService | None = None,
    ):
        self.verifier = verifier or GeminiVerifier(api_key="")
        self.verification_service = verification_service or VerificationService()

    async def run(
        self,
        image_url: str,
        challenge_title: str,
        challenge_description: str,
        verification_prompt: str | None = None,
        user_description: str | None = None,
        user_trust_score: float = 100.0,
    ) -> PipelineResult:
        """Execute the AI verification pipeline with production-grade error resilience."""
        logger.info(
            "Executing AI Pipeline for challenge '%s' (url=%s, trust_score=%.1f)",
            challenge_title,
            image_url,
            user_trust_score,
        )

        # 1. Fetch, inspect magic bytes, and process image
        try:
            image_bytes, mime_type = await self._fetch_and_process_image(image_url)
        except ValidationError as val_exc:
            logger.warning("Image validation failed for URL %s: %s", image_url, val_exc.message)
            return PipelineResult(
                verification=VerificationResult(
                    is_verified=False,
                    confidence_score=0.0,
                    feedback=val_exc.message,
                    rejection_reason="UNSUPPORTED_FORMAT" if "format" in val_exc.message.lower() else "INVALID_IMAGE",
                ),
                success=False,
                error=val_exc.message,
            )
        except Exception as exc:
            logger.error("Failed to retrieve image from URL %s: %s", image_url, exc)
            return PipelineResult(
                verification=VerificationResult(
                    is_verified=False,
                    confidence_score=0.0,
                    feedback="Could not retrieve image from storage. Queued for review.",
                    rejection_reason="IMAGE_FETCH_FAILED",
                ),
                success=False,
                error=str(exc),
            )

        # 2. Call Gemini Vision Client
        raw_verification = await self.verifier.verify(
            image_bytes=image_bytes,
            challenge_title=challenge_title,
            challenge_description=challenge_description,
            verification_prompt=verification_prompt,
            user_description=user_description,
            mime_type=mime_type,
        )

        # 3. Evaluate Decision Thresholds via VerificationService
        decision_result: DecisionResult = self.verification_service.evaluate_result(
            verification=raw_verification,
            user_trust_score=user_trust_score,
        )

        logger.info(
            "AI Verification decision for '%s': decision=%s, confidence=%.2f, reason=%s",
            challenge_title,
            decision_result.decision.value,
            decision_result.confidence_score,
            decision_result.rejection_reason,
        )

        final_verification = VerificationResult(
            is_verified=(decision_result.decision == VerificationDecision.APPROVED),
            confidence_score=decision_result.confidence_score,
            activity_detected=decision_result.activity_detected,
            environmental_impact=decision_result.environmental_impact,
            feedback=decision_result.feedback,
            rejection_reason=decision_result.rejection_reason,
            model_version=raw_verification.model_version,
            is_stock_photo=decision_result.is_stock_photo,
            is_screen_photo=decision_result.is_screen_photo,
            is_blurry=decision_result.is_blurry,
        )

        return PipelineResult(
            verification=final_verification,
            success=True,
            error=None,
        )

    async def _fetch_and_process_image(self, image_url: str) -> tuple[bytes, str]:
        """Download image over HTTPS, inspect magic bytes, enforce 10MB limit, and downscale dimensions."""
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.get(image_url)
            resp.raise_for_status()

            raw_bytes = resp.content

            # Enforce maximum 10 MB size limit
            if len(raw_bytes) > MAX_FILE_SIZE_BYTES:
                raise ValidationError(
                    f"Image file size ({len(raw_bytes) / 1024 / 1024:.1f} MB) exceeds maximum allowed 10 MB limit."
                )

            # Magic byte format verification
            mime_type = self._detect_mime_type_from_magic_bytes(raw_bytes)
            if not mime_type:
                raise ValidationError("Unsupported file format or unreadable image magic bytes.")

            # Downscale using Pillow
            try:
                img = Image.open(io.BytesIO(raw_bytes))
                img.verify()  # Check for image corruption
                img = Image.open(io.BytesIO(raw_bytes))  # Reopen after verify()

                max_size = (1024, 1024)
                img.thumbnail(max_size, Image.Resampling.LANCZOS)

                buffer = io.BytesIO()
                fmt = "JPEG" if mime_type == "image/jpeg" else "PNG"
                img.save(buffer, format=fmt, quality=85)
                return buffer.getvalue(), mime_type
            except Exception as img_exc:
                logger.warning("Pillow processing warning for URL %s: %s", image_url, img_exc)
                return raw_bytes, mime_type

    def _detect_mime_type_from_magic_bytes(self, raw_bytes: bytes) -> str | None:
        """Inspect image header magic bytes to verify file format."""
        if raw_bytes.startswith(b"\xff\xd8\xff"):
            return "image/jpeg"
        if raw_bytes.startswith(b"\x89PNG\r\n\x1a\n"):
            return "image/png"
        if raw_bytes.startswith(b"RIFF") and b"WEBP" in raw_bytes[:16]:
            return "image/webp"
        return None
