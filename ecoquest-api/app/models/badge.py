"""EcoQuest API — Badge & UserStats Models."""

import uuid
from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class Badge(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents an achievement badge that students can earn."""

    __tablename__ = "badges"

    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    icon_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    category: Mapped[str | None] = mapped_column(String(50), nullable=True)
    criteria: Mapped[dict] = mapped_column(JSONB, nullable=False)
    points_bonus: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class UserStats(Base, TimestampMixin):
    """Denormalized gamification statistics for a user."""

    __tablename__ = "user_stats"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True
    )
    total_points: Mapped[int] = mapped_column(Integer, default=0)
    level: Mapped[int] = mapped_column(Integer, default=1)
    current_streak: Mapped[int] = mapped_column(Integer, default=0)
    longest_streak: Mapped[int] = mapped_column(Integer, default=0)
    last_submission_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    total_submissions: Mapped[int] = mapped_column(Integer, default=0)
    approved_submissions: Mapped[int] = mapped_column(Integer, default=0)
    trust_score: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=50.00)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default="now()", nullable=False
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="stats")  # type: ignore[name-defined] # noqa: F821
