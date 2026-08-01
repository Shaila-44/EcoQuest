from __future__ import annotations

import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import DateTime, Enum as SQLEnum, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.models.base import Base
from app.models.enums import LoginMethod, LoginStatus

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.device import Device

class LoginAudit(Base):
    __tablename__ = "login_audit"

    audit_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    
    login_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    login_method: Mapped[LoginMethod] = mapped_column(SQLEnum(LoginMethod), nullable=False)
    ip_address: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    device_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("devices.device_id", ondelete="SET NULL"), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    status: Mapped[LoginStatus] = mapped_column(SQLEnum(LoginStatus), nullable=False)
    failure_reason: Mapped[Optional[str]] = mapped_column(String, nullable=True)


    user: Mapped["User"] = relationship("User", back_populates="login_audits")
    device: Mapped["Device"] = relationship("Device", back_populates="login_audits")
