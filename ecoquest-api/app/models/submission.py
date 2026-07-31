"""EcoQuest API — Submission Model."""

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class SubmissionStatus(str, enum.Enum):
    """Enumeration of submission lifecycle states."""

    PENDING_AI = "pending_ai"
    AI_VERIFIED = "ai_verified"
    AI_REJECTED = "ai_rejected"
    APPROVED = "approved"
    REJECTED = "rejected"
    NEEDS_RESUBMISSION = "needs_resubmission"


class Submission(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents a student's proof-of-completion for a challenge."""

    __tablename__ = "submissions"

    student_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True
    )
    challenge_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("challenges.id"), nullable=False, index=True
    )
    image_url: Mapped[str] = mapped_column(String(500), nullable=False)
    image_public_id: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[SubmissionStatus] = mapped_column(
        Enum(SubmissionStatus, name="submission_status", create_constraint=True),
        default=SubmissionStatus.PENDING_AI,
        index=True,
    )
    ai_result: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    points_awarded: Mapped[int] = mapped_column(Integer, default=0)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default="now()",
        nullable=False,
    )

    # Relationships
    student: Mapped["User"] = relationship(back_populates="submissions")  # type: ignore[name-defined] # noqa: F821
    challenge: Mapped["Challenge"] = relationship(back_populates="submissions")  # type: ignore[name-defined] # noqa: F821
    reviews: Mapped[list["Review"]] = relationship(back_populates="submission")  # type: ignore[name-defined] # noqa: F821
