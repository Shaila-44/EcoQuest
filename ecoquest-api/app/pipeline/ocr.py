"""EcoQuest API — OCR Module (EasyOCR).

Extracts text from images when present. Skips automatically
if no text is detected.
"""

from app.pipeline.schemas import OCRResult


class TextExtractor:
    """EasyOCR-based text extraction for the AI pipeline."""

    async def extract(self, image_bytes: bytes) -> OCRResult:
        """Extract text from an image using EasyOCR.

        TODO: Implement:
        1. Initialize EasyOCR reader (lazy, cached)
        2. Run OCR on the preprocessed image
        3. Return extracted text or None if no text detected
        """
        return OCRResult()
