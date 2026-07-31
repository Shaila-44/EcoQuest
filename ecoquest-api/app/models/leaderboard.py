"""EcoQuest API — Leaderboard Model.

NOTE: In production, this is implemented as a PostgreSQL materialized view.
This module provides a read-only ORM mapping for query convenience.
The actual materialized view is created via an Alembic migration.
"""

import uuid
from decimal import Decimal

from sqlalchemy import Integer, Numeric, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class LeaderboardEntry(Base):
    """Read-only ORM mapping for the leaderboard_weekly materialized view."""

    __tablename__ = "leaderboard_weekly"
    __table_args__ = {"info": {"is_view": True}}

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    school_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    school_name: Mapped[str | None] = mapped_column(String(255))
    total_points: Mapped[int] = mapped_column(Integer)
    level: Mapped[int] = mapped_column(Integer)
    current_streak: Mapped[int] = mapped_column(Integer)
    trust_score: Mapped[Decimal] = mapped_column(Numeric(5, 2))
    overall_rank: Mapped[int] = mapped_column(Integer)
    school_rank: Mapped[int] = mapped_column(Integer)
