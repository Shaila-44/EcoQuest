"""EcoQuest API — Cloudinary Storage Implementation."""

import time
import cloudinary
import cloudinary.uploader
import cloudinary.utils
from app.storage.base import StorageBackend


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
        allowed_formats: list[str] | None = None,
        max_bytes: int = 10485760,
    ) -> dict:
        """Generate a Cloudinary signed upload URL parameters."""
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
        except Exception:
            return False

    def get_url(self, public_id: str, transformations: dict | None = None) -> str:
        """Get a Cloudinary URL with optional transformations."""
        if transformations:
            return cloudinary.CloudinaryImage(public_id).build_url(**transformations)
        return f"https://res.cloudinary.com/{self.cloud_name}/image/upload/{public_id}"
