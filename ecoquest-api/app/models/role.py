import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SQLEnum
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin
from app.models.enums import RoleName

if TYPE_CHECKING:
    from app.models.user import User

class Role(Base, TimestampMixin):
    __tablename__ = "roles"

    role_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    role_name: Mapped[RoleName] = mapped_column(SQLEnum(RoleName), nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)

    users: Mapped[list["User"]] = relationship("User", back_populates="role")

    @property
    def name(self) -> str:
        r = self.role_name
        return r.value if hasattr(r, "value") else str(r)

