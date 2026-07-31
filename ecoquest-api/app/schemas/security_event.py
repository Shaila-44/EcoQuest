"""EcoQuest API — Security Event Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.models.enums import SeverityLevel


class SecurityEventBase(BaseModel):
    event_type: str = Field(..., max_length=100)
    description: str
    ip_address: str | None = None
    severity: SeverityLevel = SeverityLevel.LOW


class SecurityEventCreate(SecurityEventBase):
    user_id: uuid.UUID | None = None
    school_id: uuid.UUID | None = None


class SecurityEventUpdate(BaseModel):
    is_resolved: bool | None = None
    resolved_by: uuid.UUID | None = None
    resolution_notes: str | None = None


class SecurityEventResponse(SecurityEventBase):
    event_id: uuid.UUID
    user_id: uuid.UUID | None
    school_id: uuid.UUID | None
    is_resolved: bool
    resolved_by: uuid.UUID | None
    resolution_notes: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
