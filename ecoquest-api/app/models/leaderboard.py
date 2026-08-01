import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import DateTime, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.user import User

class Leaderboard(Base):
    """Cached Leaderboard entry per user."""
    __tablename__ = "leaderboard"

    leaderboard_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.user_id", ondelete="CASCADE"), unique=True, nullable=False)
    
    total_points: Mapped[int] = mapped_column(Integer, default=0)
    global_rank: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    category_rank: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)


    user: Mapped["User"] = relationship("User", back_populates="leaderboard")
