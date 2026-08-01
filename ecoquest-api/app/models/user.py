import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SQLEnum
from sqlalchemy import Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin
from app.models.enums import UserStatus

if TYPE_CHECKING:
    from app.models.ai_verification import AIVerification
    from app.models.challenge import Challenge
    from app.models.device import Device
    from app.models.device_approval import DeviceApproval
    from app.models.leaderboard import Leaderboard
    from app.models.login_audit import LoginAudit
    from app.models.role import Role
    from app.models.school import School
    from app.models.security_event import SecurityEvent
    from app.models.submission import Submission
    from app.models.trust_score_history_user import TrustScoreHistoryUser
    from app.models.user_badge import UserBadge
    from app.models.user_session import UserSession

class User(Base, TimestampMixin):
    __tablename__ = "users"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    school_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("schools.school_id", ondelete="CASCADE"), nullable=False)
    role_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("roles.role_id", ondelete="RESTRICT"), nullable=False)

    name: Mapped[str] = mapped_column(String, nullable=False)
    email_encrypted: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    email_hash: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    phone_encrypted: Mapped[str | None] = mapped_column(String, unique=True, index=True, nullable=True)
    phone_hash: Mapped[str | None] = mapped_column(String, unique=True, index=True, nullable=True)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    profile_image: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[UserStatus] = mapped_column(SQLEnum(UserStatus), nullable=False, default=UserStatus.ACTIVE)
    trust_score: Mapped[float] = mapped_column(Float, default=100.0)

    school: Mapped["School"] = relationship("School", back_populates="users")
    role: Mapped["Role"] = relationship("Role", back_populates="users")
    devices: Mapped[list["Device"]] = relationship("Device", back_populates="user", cascade="all, delete-orphan")
    login_audits: Mapped[list["LoginAudit"]] = relationship("LoginAudit", back_populates="user", cascade="all, delete-orphan")
    user_badges: Mapped[list["UserBadge"]] = relationship("UserBadge", back_populates="user", cascade="all, delete-orphan")
    submissions: Mapped[list["Submission"]] = relationship("Submission", back_populates="user", cascade="all, delete-orphan")
    created_challenges: Mapped[list["Challenge"]] = relationship("Challenge", back_populates="creator", cascade="all, delete-orphan")
    leaderboard: Mapped["Leaderboard"] = relationship("Leaderboard", back_populates="user", uselist=False, cascade="all, delete-orphan")
    trust_score_history: Mapped[list["TrustScoreHistoryUser"]] = relationship("TrustScoreHistoryUser", back_populates="user", cascade="all, delete-orphan")
    ai_verifications_done: Mapped[list["AIVerification"]] = relationship("AIVerification", back_populates="verifier")
    security_events_resolved: Mapped[list["SecurityEvent"]] = relationship("SecurityEvent", back_populates="resolver")
    sessions: Mapped[list["UserSession"]] = relationship("UserSession", back_populates="user", cascade="all, delete-orphan")
    device_approvals: Mapped[list["DeviceApproval"]] = relationship("DeviceApproval", back_populates="user", cascade="all, delete-orphan")


    @property
    def id(self) -> uuid.UUID:
        return self.user_id

    @property
    def email(self) -> str:
        return self.email_encrypted

    @property
    def first_name(self) -> str:
        parts = self.name.split(" ", 1)
        return parts[0]

    @property
    def last_name(self) -> str:
        parts = self.name.split(" ", 1)
        return parts[1] if len(parts) > 1 else ""

    @property
    def avatar_url(self) -> str | None:
        return self.profile_image

    @property
    def is_active(self) -> bool:
        return self.status == UserStatus.ACTIVE

    @property
    def grade(self) -> str | None:
        return None

    @property
    def last_login_at(self) -> None:
        return None

