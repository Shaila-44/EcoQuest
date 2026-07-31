"""EcoQuest API — Login Audit Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.models.enums import LoginMethod, LoginStatus


class LoginAuditBase(BaseModel):
    login_method: LoginMethod
    status: LoginStatus
    ip_address: str | None = None
    user_agent: str | None = None


class LoginAuditCreate(LoginAuditBase):
    user_id: uuid.UUID


class LoginAuditResponse(LoginAuditBase):
    audit_id: uuid.UUID
    user_id: uuid.UUID
    attempt_time: datetime

    model_config = ConfigDict(from_attributes=True)
