from __future__ import annotations

"""EcoQuest API — Custom Exception Classes.

Structured exception hierarchy for consistent error handling.
"""



class EcoQuestError(Exception):
    """Base exception for all application errors."""

    def __init__(
        self,
        message: str,
        code: str,
        status_code: int = 500,
        details: dict | None = None,
    ):
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)



class ValidationError(EcoQuestError):
    """Raised when input validation fails."""

    def __init__(self, message: str, details: dict | None = None):
        super().__init__(message, "VALIDATION_ERROR", 422, details)


class AuthenticationError(EcoQuestError):
    """Raised when authentication fails."""

    def __init__(self, message: str = "Invalid credentials"):
        super().__init__(message, "AUTHENTICATION_ERROR", 401)


class AuthorizationError(EcoQuestError):
    """Raised when a user lacks permission."""

    def __init__(self, message: str = "Insufficient permissions"):
        super().__init__(message, "AUTHORIZATION_ERROR", 403)


class NotFoundError(EcoQuestError):
    """Raised when a resource is not found."""

    def __init__(self, resource: str, resource_id: str):
        super().__init__(
            f"{resource} not found", "NOT_FOUND", 404, {"resource_id": resource_id}
        )


class DuplicateError(EcoQuestError):
    """Raised when a duplicate resource is detected."""

    def __init__(self, message: str, details: dict | None = None):
        super().__init__(message, "DUPLICATE_ERROR", 409, details)


class PipelineError(EcoQuestError):
    """Raised when the AI pipeline encounters an error."""

    def __init__(self, stage: str, message: str):
        super().__init__(message, "PIPELINE_ERROR", 502, {"stage": stage})
