"""EcoQuest API — Role Schemas."""

import uuid
from pydantic import BaseModel, ConfigDict, Field
from app.models.enums import RoleName


class RoleBase(BaseModel):
    name: RoleName = Field(..., description="The name of the role")
    description: str | None = Field(None, description="Optional description of the role")
    permissions: dict = Field(default_factory=dict, description="JSON permissions mapping")


class RoleCreate(RoleBase):
    pass


class RoleUpdate(BaseModel):
    description: str | None = None
    permissions: dict | None = None


class RoleResponse(RoleBase):
    role_id: uuid.UUID

    model_config = ConfigDict(from_attributes=True)
