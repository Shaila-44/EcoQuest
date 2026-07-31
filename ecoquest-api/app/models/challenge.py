"""EcoQuest API — Challenge Model."""

import enum
import uuid
from datetime import datetime

from sqlalchemy import CheckConstraint, Enum, ForeignKey, Integer, SmallInteger, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class ChallengeStatus(str, enum.Enum):
    """Enumeration of challenge lifecycle states."""

    DRAFT = "draft"
    ACTIVE = "active"
    ARCHIVED = "archived"


class ChallengeCategory(str, enum.Enum):
    """Enumeration of eco-challenge categories."""

    WASTE_REDUCTION = "waste_reduction"
    ENERGY_SAVING = "energy_saving"
    WATER_CONSERVATION = "water_conservation"
    TREE_PLANTING = "tree_planting"
    RECYCLING = "recycling"
    COMPOSTING = "composting"
    CLEAN_COMMUTE = "clean_commute"
    BIODIVERSITY = "biodiversity"
    AWARENESS = "awareness"
    OTHER = "other"


class Challenge(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents an eco-challenge created by a teacher or admin."""

    __tablename__ = "challenges"
    __table_args__ = (
        CheckConstraint("ends_at IS NULL OR ends_at > starts_at", name="valid_date_range"),
        CheckConstraint("difficulty BETWEEN 1 AND 5", name="valid_difficulty"),
    )

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    instructions: Mapped[str | None] = mapped_column(Text, nullable=True)
    category: Mapped[ChallengeCategory] = mapped_column(
        Enum(ChallengeCategory, name="challenge_category", create_constraint=True),
        nullable=False,
    )
    status: Mapped[ChallengeStatus] = mapped_column(
        Enum(ChallengeStatus, name="challenge_status", create_constraint=True),
        default=ChallengeStatus.DRAFT,
    )
    points: Mapped[int] = mapped_column(Integer, default=10, nullable=False)
    difficulty: Mapped[int | None] = mapped_column(SmallInteger, nullable=True)
    created_by: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )
    school_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("schools.id"), nullable=True, index=True
    )
    starts_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    ends_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    max_submissions: Mapped[int] = mapped_column(Integer, default=1)
    verification_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # Relationships
    creator: Mapped["User"] = relationship(back_populates="created_challenges")  # type: ignore[name-defined] # noqa: F821
    school: Mapped["School | None"] = relationship(back_populates="challenges")  # type: ignore[name-defined] # noqa: F821
    submissions: Mapped[list["Submission"]] = relationship(back_populates="challenge")  # type: ignore[name-defined] # noqa: F821
