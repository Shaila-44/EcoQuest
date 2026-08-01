from datetime import datetime
from typing import TYPE_CHECKING
import uuid

from sqlalchemy import DateTime, Float, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.school import School

class SchoolTrustScore(Base):
    __tablename__ = "school_trust_score"

    school_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("schools.school_id", ondelete="CASCADE"), primary_key=True)
    
    current_trust_score: Mapped[float] = mapped_column(Float, default=100.0)
    last_calculated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    school: Mapped["School"] = relationship("School", back_populates="trust_score")
