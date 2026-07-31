"""EcoQuest API — School Model."""

import uuid

from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDPrimaryKeyMixin


class School(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents a school enrolled in the EcoQuest platform."""

    __tablename__ = "schools"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str] = mapped_column(String(100), default="India")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # Relationships
    users: Mapped[list["User"]] = relationship(back_populates="school")  # type: ignore[name-defined] # noqa: F821
    challenges: Mapped[list["Challenge"]] = relationship(back_populates="school")  # type: ignore[name-defined] # noqa: F821
