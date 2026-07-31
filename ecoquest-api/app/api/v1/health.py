"""EcoQuest API — Health Check Routes."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check() -> dict:
    """Health check endpoint for load balancer probes."""
    return {"status": "healthy", "service": "ecoquest-api", "version": "0.1.0"}
