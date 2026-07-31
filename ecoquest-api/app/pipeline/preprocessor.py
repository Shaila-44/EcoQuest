"""EcoQuest API — Image Preprocessor (Pillow).

Handles lightweight image preparation: EXIF orientation correction,
resizing oversized images, and optional JPEG compression.
"""

import io
from PIL import Image, ImageOps
from app.pipeline.schemas import PreprocessingResult


class ImagePreprocessor:
    """Pillow-based image preparation for the AI pipeline."""

    def __init__(self, max_dimension: int = 1600, quality: int = 85):
        self.max_dimension = max_dimension
        self.quality = quality

    async def process(self, image_bytes: bytes) -> PreprocessingResult:
        """Prepare an image for AI verification.

        TODO: Implement:
        1. Open image from bytes using Pillow
        2. Correct EXIF orientation using ImageOps.exif_transpose
        3. Resize preserving aspect ratio if longest edge > max_dimension
        4. Compress as JPEG with defined quality
        5. Return processed bytes and size metadata
        """
        return PreprocessingResult()
