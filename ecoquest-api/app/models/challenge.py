from __future__ import annotations

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.school import School
    from app.models.submission import Submission
    from app.models.user import User

class Challenge(Base, TimestampMixin):
    __tablename__ = "challenges"

    challenge_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("schools.school_id", ondelete="CASCADE"), nullable=False)
    created_by: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.user_id", ondelete="RESTRICT"), nullable=False)

    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    category: Mapped[str] = mapped_column(String, nullable=False)
    points: Mapped[int] = mapped_column(Integer, default=0)
    start_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    end_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


    school: Mapped[School] = relationship("School", back_populates="challenges")
    creator: Mapped[User] = relationship("User", back_populates="created_challenges")
    submissions: Mapped[list[Submission]] = relationship("Submission", back_populates="challenge", cascade="all, delete-orphan")
