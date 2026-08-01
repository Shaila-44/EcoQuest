import uuid
from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.challenge import Challenge
    from app.models.school_trust_factor import SchoolTrustFactor
    from app.models.school_trust_score import SchoolTrustScore
    from app.models.trust_score_history_school import TrustScoreHistorySchool
    from app.models.user import User

class School(Base, TimestampMixin):
    __tablename__ = "schools"

    school_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    school_code: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    school_name: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str | None] = mapped_column(String, nullable=True)
    city: Mapped[str | None] = mapped_column(String, nullable=True)
    state: Mapped[str | None] = mapped_column(String, nullable=True)
    pincode: Mapped[str | None] = mapped_column(String, nullable=True)


    users: Mapped[list["User"]] = relationship("User", back_populates="school", cascade="all, delete-orphan")
    challenges: Mapped[list["Challenge"]] = relationship("Challenge", back_populates="school", cascade="all, delete-orphan")
    trust_score: Mapped["SchoolTrustScore"] = relationship("SchoolTrustScore", back_populates="school", uselist=False, cascade="all, delete-orphan")
    trust_factors: Mapped[list["SchoolTrustFactor"]] = relationship("SchoolTrustFactor", back_populates="school", cascade="all, delete-orphan")
    trust_score_history: Mapped[list["TrustScoreHistorySchool"]] = relationship("TrustScoreHistorySchool", back_populates="school", cascade="all, delete-orphan")
