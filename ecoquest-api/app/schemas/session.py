from __future__ import annotations

"""EcoQuest API — Session & Device Approval Schemas."""

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SessionRead(BaseModel):
    """Pydantic schema for user session response."""

    model_config = ConfigDict(from_attributes=True)

    session_id: uuid.UUID
    user_id: uuid.UUID
    device_id: str
    device_name: str
    is_active: bool
    created_at: datetime
    last_active_at: datetime
    expires_at: datetime
    revoked_at: datetime | None = None


class DeviceApprovalRead(BaseModel):
    """Pydantic schema for pending device login approval request."""

    model_config = ConfigDict(from_attributes=True)

    request_id: uuid.UUID
    user_id: uuid.UUID
    device_id: str
    device_name: str
    ip_address: str | None = None
    status: str
    created_at: datetime
    expires_at: datetime



class ChangePasswordRequest(BaseModel):
    """Pydantic schema for changing user password."""

    current_password: str = Field(..., min_length=1)
    new_password: str = Field(..., min_length=8)


class LoginResponseEnvelope(BaseModel):
    """Envelope for login response supporting immediate token issuance or pending approval requirement."""

    status: str = Field(default="SUCCESS", description="SUCCESS or APPROVAL_REQUIRED")
    access_token: str | None = None
    refresh_token: str | None = None
    token_type: str | None = "bearer"
    request_id: uuid.UUID | None = Field(default=None, description="Set when status is APPROVAL_REQUIRED")
    message: str | None = None
