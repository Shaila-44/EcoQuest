"""EcoQuest API — Production Gemini Vision Client.

Connects strictly to Google Gemini Vision API to verify eco-activity image submissions.
Follows SOLID principles and clean architecture:
- Single Responsibility: Communicates only with Gemini Vision API.
- Interface Segregation: Extends abstract BaseVisionVerifier interface.
- Zero database access, zero gamification, zero side-effects.
"""

import abc
import asyncio
import json
import logging
import warnings

with warnings.catch_warnings():
    warnings.simplefilter("ignore", category=FutureWarning)
    import google.generativeai as genai
    from google.generativeai.types import GenerationConfig

from app.pipeline.prompts import SYSTEM_AUDITOR_INSTRUCTION, build_verification_prompt
from app.pipeline.schemas import (
    GeminiVisionResponseSchema,
    VerificationResult,
)

logger = logging.getLogger(__name__)


class BaseVisionVerifier(abc.ABC):
    """Abstract interface for multimodal vision verification clients."""

    @abc.abstractmethod
    async def verify(
        self,
        image_bytes: bytes,
        challenge_title: str,
        challenge_description: str,
        verification_prompt: str | None = None,
        user_description: str | None = None,
        mime_type: str = "image/jpeg",
    ) -> VerificationResult:
        """Verify an eco-activity image and return structured verification data."""
        pass


class GeminiVerifier(BaseVisionVerifier):
    """Production Google Gemini Vision API client for eco-activity verification."""

    def __init__(
        self,
        api_key: str,
        model: str = "gemini-2.0-flash",
        request_timeout: float = 10.0,
        max_retries: int = 3,
    ):
        self.api_key = api_key
        self.model_name = model
        self.request_timeout = request_timeout
        self.max_retries = max_retries
        if api_key:
            genai.configure(api_key=api_key)

    async def verify(
        self,
        image_bytes: bytes,
        challenge_title: str,
        challenge_description: str,
        verification_prompt: str | None = None,
        user_description: str | None = None,
        mime_type: str = "image/jpeg",
    ) -> VerificationResult:
        """Verify an eco-activity image using Gemini Vision API."""
        if not self.api_key:
            logger.warning("GEMINI_API_KEY is not configured; returning unverified fallback.")
            return VerificationResult(
                is_verified=False,
                confidence_score=0.0,
                feedback="Gemini API Key is missing in environment settings.",
                rejection_reason="AI_UNCONFIGURED",
            )

        prompt_text = build_verification_prompt(
            challenge_title=challenge_title,
            challenge_description=challenge_description,
            verification_prompt=verification_prompt,
            user_description=user_description,
        )

        image_part = {
            "mime_type": mime_type,
            "data": image_bytes,
        }

        generation_config = GenerationConfig(
            temperature=0.1,
            response_mime_type="application/json",
            response_schema=GeminiVisionResponseSchema,
        )

        model = genai.GenerativeModel(
            model_name=self.model_name,
            system_instruction=SYSTEM_AUDITOR_INSTRUCTION,
            generation_config=generation_config,
        )

        backoff_delays = [1.0, 2.0, 4.0]

        for attempt in range(self.max_retries):
            try:
                # Execute synchronous SDK call in thread pool with 10-second timeout
                response = await asyncio.wait_for(
                    asyncio.to_thread(
                        model.generate_content,
                        contents=[image_part, prompt_text],
                    ),
                    timeout=self.request_timeout,
                )

                response_text = (response.text or "").strip()
                logger.debug("Gemini raw response text (Attempt %d): %s", attempt + 1, response_text)

                # Clean potential markdown code blocks
                if response_text.startswith("```"):
                    response_text = response_text.strip("`").removeprefix("json").strip()

                parsed_json = json.loads(response_text)
                validated_data = GeminiVisionResponseSchema.model_validate(parsed_json)

                return VerificationResult(
                    is_verified=validated_data.is_verified,
                    confidence_score=validated_data.confidence_score,
                    activity_detected=validated_data.activity_detected,
                    environmental_impact=validated_data.environmental_impact,
                    feedback=validated_data.feedback,
                    rejection_reason=validated_data.rejection_reason,
                    model_version=self.model_name,
                    is_stock_photo=validated_data.authenticity_flags.is_stock_photo,
                    is_screen_photo=validated_data.authenticity_flags.is_screen_photo,
                    is_blurry=validated_data.authenticity_flags.is_blurry,
                )

            except asyncio.TimeoutError:
                logger.warning("Gemini API call timed out after %.1fs (Attempt %d)", self.request_timeout, attempt + 1)
                if attempt == self.max_retries - 1:
                    return VerificationResult(
                        is_verified=False,
                        confidence_score=0.0,
                        feedback="AI verification timed out. Queued for review.",
                        rejection_reason="AI_TIMEOUT",
                    )
            except json.JSONDecodeError as exc:
                logger.error("Failed to parse Gemini JSON response (Attempt %d): %s", attempt + 1, exc)
                if attempt == self.max_retries - 1:
                    return VerificationResult(
                        is_verified=False,
                        confidence_score=0.0,
                        feedback="Failed to parse AI response structure.",
                        rejection_reason="AI_SCHEMA_ERROR",
                    )
            except Exception as exc:
                logger.warning("Gemini API call error (Attempt %d): %s", attempt + 1, exc)
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(backoff_delays[min(attempt, len(backoff_delays) - 1)])
                else:
                    logger.error("Gemini API retries exhausted.")
                    return VerificationResult(
                        is_verified=False,
                        confidence_score=0.0,
                        feedback="AI verification service currently unavailable.",
                        rejection_reason="AI_UNAVAILABLE",
                    )

        return VerificationResult(is_verified=False, confidence_score=0.0, rejection_reason="AI_UNKNOWN_ERROR")
