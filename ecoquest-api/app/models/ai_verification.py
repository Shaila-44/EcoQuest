import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, Enum as SQLEnum, Float, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.models.base import Base
from app.models.enums import VerificationStatus

if TYPE_CHECKING:
    from app.models.submission import Submission
    from app.models.user import User
    from app.models.security_event import SecurityEvent

class AIVerification(Base):
    __tablename__ = "ai_verification"

    verification_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    submission_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("submissions.submission_id", ondelete="CASCADE"), unique=True, nullable=False)
    
    ai_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    gps_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    exif_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    duplicate_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    fraud_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    final_status: Mapped[VerificationStatus] = mapped_column(SQLEnum(VerificationStatus), nullable=False, default=VerificationStatus.PENDING)
    verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    verified_by: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.user_id", ondelete="SET NULL"), nullable=True)

    submission: Mapped["Submission"] = relationship("Submission", back_populates="ai_verification")
    verifier: Mapped["User"] = relationship("User", back_populates="ai_verifications_done")
    security_events: Mapped[list["SecurityEvent"]] = relationship("SecurityEvent", back_populates="verification", cascade="all, delete-orphan")
