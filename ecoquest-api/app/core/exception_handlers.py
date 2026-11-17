"""EcoQuest API — Exception Handlers.

Registers FastAPI exception handlers that map custom exceptions
to structured JSON error responses.
"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.exceptions import EcoQuestError


def register_exception_handlers(app: FastAPI) -> None:
    """Register all custom exception handlers on the FastAPI app."""

    @app.exception_handler(EcoQuestError)
    async def ecoquest_error_handler(request: Request, exc: EcoQuestError) -> JSONResponse:
        """Handle all EcoQuest application errors with structured response."""
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": {
                    "code": exc.code,
                    "message": exc.message,
                    "details": exc.details,
                    "request_id": getattr(request.state, "request_id", None),
                }
            },
        )

    @app.exception_handler(Exception)
    async def unhandled_error_handler(request: Request, exc: Exception) -> JSONResponse:
        """Catch-all for unhandled exceptions — never leak stack traces."""
        return JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "An unexpected error occurred",
                    "details": {},
                    "request_id": getattr(request.state, "request_id", None),
                }
            },
        )
