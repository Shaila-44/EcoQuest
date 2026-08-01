from __future__ import annotations

"""EcoQuest API — Common Response Schemas."""

from typing import Optional
from pydantic import BaseModel


class ErrorDetail(BaseModel):
    """Structured error detail."""

    code: str
    message: str
    details: dict = {}
    request_id: Optional[str] = None



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
