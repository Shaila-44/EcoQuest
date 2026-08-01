from __future__ import annotations

"""EcoQuest API — Cloudinary Storage Implementation."""

import logging
import time
from typing import Optional
import cloudinary
import cloudinary.uploader
import cloudinary.utils
from fastapi import HTTPException, status
from app.storage.base import StorageBackend

logger = logging.getLogger(__name__)


class CloudinaryStorage(StorageBackend):
    """Cloudinary implementation of the storage backend."""

    def __init__(self, cloud_name: str, api_key: str, api_secret: str):
        self.cloud_name = cloud_name
        self.api_key = api_key
        self.api_secret = api_secret
        if cloud_name and api_key and api_secret:
            cloudinary.config(
                cloud_name=cloud_name,
                api_key=api_key,
                api_secret=api_secret,
                secure=True,
            )

    async def generate_upload_url(
        self,
        folder: str,
        public_id: str,
        allowed_formats: Optional[list[str]] = None,
        max_bytes: int = 10485760,
    ) -> dict:

        """Generate a Cloudinary signed upload URL parameters."""
        if not (self.cloud_name and self.api_key and self.api_secret):
            logger.error("Cloudinary is not configured (missing cloud_name/api_key/api_secret).")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Image storage is not configured on this server. Set CLOUDINARY_CLOUD_NAME, "
                "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
            )

        timestamp = int(time.time())
        params_to_sign = {
            "timestamp": timestamp,
            "folder": folder,
            "public_id": public_id,
        }
        if allowed_formats:
            params_to_sign["allowed_formats"] = ",".join(allowed_formats)

        signature = cloudinary.utils.api_sign_request(params_to_sign, self.api_secret)

        upload_url = f"https://api.cloudinary.com/v1_1/{self.cloud_name}/image/upload"

        return {
            "upload_url": upload_url,
            "public_id": public_id,
            "timestamp": timestamp,
            "signature": signature,
            "api_key": self.api_key,
            "folder": folder,
        }

    async def delete(self, public_id: str) -> bool:
        """Delete an image from Cloudinary."""
        try:
            res = cloudinary.uploader.destroy(public_id)
            return res.get("result") == "ok"
        except Exception as exc:
            logger.error("Failed to delete Cloudinary asset '%s': %s", public_id, exc)
            return False

    def get_url(self, public_id: str, transformations: dict | None = None) -> str:
        """Get a Cloudinary URL with optional transformations."""
        if transformations:
            return cloudinary.CloudinaryImage(public_id).build_url(**transformations)
        return f"https://res.cloudinary.com/{self.cloud_name}/image/upload/{public_id}"
