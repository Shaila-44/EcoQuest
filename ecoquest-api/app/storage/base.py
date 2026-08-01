from __future__ import annotations

"""EcoQuest API — Abstract Storage Interface.

Strategy pattern for file storage. Implementations can be swapped
without changing business logic.
"""

from abc import ABC, abstractmethod
from typing import Optional


class StorageBackend(ABC):
    """Abstract base class for file storage backends."""

    @abstractmethod
    async def generate_upload_url(
        self,
        folder: str,
        public_id: str,
        allowed_formats: list[str],
        max_bytes: int,
    ) -> dict:
        """Generate a signed upload URL for direct client upload.

        Returns:
            Dict with upload_url, public_id, and signature.
        """
        ...

    @abstractmethod
    async def delete(self, public_id: str) -> bool:
        """Delete a file by its public ID.

        Returns:
            True if deleted, False if not found.
        """
        ...

    @abstractmethod
    def get_url(self, public_id: str, transformations: Optional[dict] = None) -> str:

        """Get a URL for a stored file with optional transformations.

        Returns:
            Public URL string.
        """
        ...
