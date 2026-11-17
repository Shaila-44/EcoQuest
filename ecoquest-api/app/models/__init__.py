"""EcoQuest API — SQLAlchemy Models.

Expose all models here so Alembic can discover them.
"""

from app.models.base import Base
from app.models.school import School
from app.models.role import Role
from app.models.user import User
from app.models.device import Device
from app.models.login_audit import LoginAudit
from app.models.challenge import Challenge
from app.models.submission import Submission
from app.models.ai_verification import AIVerification
from app.models.review import Review
from app.models.security_event import SecurityEvent
from app.models.badge import Badge
from app.models.user_badge import UserBadge
from app.models.leaderboard import Leaderboard
from app.models.trust_score_history_user import TrustScoreHistoryUser
from app.models.school_trust_score import SchoolTrustScore
from app.models.school_trust_factor import SchoolTrustFactor
from app.models.trust_score_history_school import TrustScoreHistorySchool
from app.models.user_session import UserSession
from app.models.device_approval import DeviceApproval


# Also expose Enums if needed directly from models
from app.models.enums import (
    RoleName,
    UserStatus,
    LoginMethod,
    LoginStatus,
    SubmissionStatus,
    VerificationStatus,
    SeverityLevel,
)

__all__ = [
    "Base",
    "School",
    "Role",
    "User",
    "Device",
    "LoginAudit",
    "Challenge",
    "Submission",
    "AIVerification",
    "Review",
    "SecurityEvent",
    "Badge",
    "UserBadge",
    "Leaderboard",
    "TrustScoreHistoryUser",
    "SchoolTrustScore",
    "SchoolTrustFactor",
    "TrustScoreHistorySchool",
    "UserSession",
    "DeviceApproval",
    "RoleName",
    "UserStatus",
    "LoginMethod",
    "LoginStatus",
    "SubmissionStatus",
    "VerificationStatus",
    "SeverityLevel",
]
