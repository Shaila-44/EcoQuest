"""EcoQuest API — User Model."""

import enum
import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class UserRole(str, enum.Enum):
    """Enumeration of user roles."""

    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"


class User(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents a user (student, teacher, or admin) on the platform."""

    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role", create_constraint=True),
        default=UserRole.STUDENT,
        nullable=False,
        index=True,
    )
    school_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("schools.id", ondelete="SET NULL"), nullable=True, index=True
    )
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    grade: Mapped[str | None] = mapped_column(String(20), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    school: Mapped["School | None"] = relationship(back_populates="users")  # type: ignore[name-defined] # noqa: F821
    submissions: Mapped[list["Submission"]] = relationship(back_populates="student")  # type: ignore[name-defined] # noqa: F821
    created_challenges: Mapped[list["Challenge"]] = relationship(back_populates="creator")  # type: ignore[name-defined] # noqa: F821
    reviews: Mapped[list["Review"]] = relationship(back_populates="reviewer")  # type: ignore[name-defined] # noqa: F821
    badges: Mapped[list["UserBadge"]] = relationship(back_populates="user")  # type: ignore[name-defined] # noqa: F821
    stats: Mapped["UserStats | None"] = relationship(back_populates="user")  # type: ignore[name-defined] # noqa: F821
