from __future__ import annotations

"""EcoQuest API — Device Approval Request Model."""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.user import User


class DeviceApproval(Base):
    """Represents a pending device login request awaiting user approval."""

    __tablename__ = "device_approvals"

    request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False, index=True
    )
    device_id: Mapped[str] = mapped_column(String(100), nullable=False)
    device_name: Mapped[str] = mapped_column(String(100), nullable=False)
    ip_address: Mapped[Optional[str]] = mapped_column(String(45), nullable=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="PENDING", index=True)  # PENDING, APPROVED, REJECTED
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="device_approvals")
