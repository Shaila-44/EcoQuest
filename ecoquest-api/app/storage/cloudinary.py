"""EcoQuest API — Cloudinary Storage Implementation."""

from app.storage.base import StorageBackend


class CloudinaryStorage(StorageBackend):
    """Cloudinary implementation of the storage backend."""

    def __init__(self, cloud_name: str, api_key: str, api_secret: str):
        self.cloud_name = cloud_name
        self.api_key = api_key
        self.api_secret = api_secret

    async def generate_upload_url(
        self,
        folder: str,
        public_id: str,
        allowed_formats: list[str],
        max_bytes: int,
    ) -> dict:
        """Generate a Cloudinary signed upload URL.

        TODO: Implement using cloudinary.utils.api_sign_request()
        """
        return {"upload_url": "", "public_id": public_id, "signature": ""}

    async def delete(self, public_id: str) -> bool:
        """Delete an image from Cloudinary.

        TODO: Implement using cloudinary.uploader.destroy()
        """
        return False

    def get_url(self, public_id: str, transformations: dict | None = None) -> str:
        """Get a Cloudinary URL with optional transformations.

        TODO: Implement using cloudinary.CloudinaryImage().build_url()
        """
        return f"https://res.cloudinary.com/{self.cloud_name}/image/upload/{public_id}"
