from __future__ import annotations

import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import Boolean, DateTime, Enum as SQLEnum, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.models.base import Base
from app.models.enums import SeverityLevel

if TYPE_CHECKING:
    from app.models.ai_verification import AIVerification
    from app.models.user import User

class SecurityEvent(Base):
    __tablename__ = "security_events"

    event_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    verification_id: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("ai_verification.verification_id", ondelete="CASCADE"), nullable=True)
    
    event_type: Mapped[str] = mapped_column(String, nullable=False)
    severity: Mapped[SeverityLevel] = mapped_column(SQLEnum(SeverityLevel), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    resolved: Mapped[bool] = mapped_column(Boolean, default=False)
    resolved_by: Mapped[Optional[uuid.UUID]] = mapped_column(ForeignKey("users.user_id", ondelete="SET NULL"), nullable=True)


    verification: Mapped["AIVerification"] = relationship("AIVerification", back_populates="security_events")
    resolver: Mapped["User"] = relationship("User", back_populates="security_events_resolved")
