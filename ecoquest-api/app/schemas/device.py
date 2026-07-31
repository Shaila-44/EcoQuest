"""EcoQuest API — Device Schemas."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class DeviceBase(BaseModel):
    device_token: str
    device_type: str
    os_version: str | None = None
    app_version: str | None = None


class DeviceCreate(DeviceBase):
    user_id: uuid.UUID


class DeviceUpdate(BaseModel):
    device_token: str | None = None
    os_version: str | None = None
    app_version: str | None = None
    is_active: bool | None = None


class DeviceResponse(DeviceBase):
    device_id: uuid.UUID
    user_id: uuid.UUID
    is_active: bool
    last_active_at: datetime
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
