"""EcoQuest API — Common Schemas."""

from datetime import datetime
from pydantic import BaseModel, ConfigDict


class TimestampSchema(BaseModel):
    """Mixin for timestamps."""
    created_at: datetime
    updated_at: datetime


class ErrorDetail(BaseModel):
    """Structured error detail."""
    code: str
    message: str
    details: dict = {}
    request_id: str | None = None


class ErrorResponse(BaseModel):
    """Standard error response envelope."""
    error: ErrorDetail


class PaginatedMeta(BaseModel):
    """Pagination metadata."""
    page: int = 1
    per_page: int = 20
    total: int = 0
    total_pages: int = 0


class PaginatedResponse(BaseModel):
    """Paginated response envelope."""
    data: list = []
    meta: PaginatedMeta = PaginatedMeta()


class MessageResponse(BaseModel):
    """Simple success message response."""
    message: str
