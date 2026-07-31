"""EcoQuest API — Schemas."""

from .common import (
    TimestampSchema,
    ErrorDetail,
    ErrorResponse,
    PaginatedMeta,
    PaginatedResponse,
    MessageResponse,
)
from .role import RoleBase, RoleCreate, RoleUpdate, RoleResponse
from .school import SchoolBase, SchoolCreate, SchoolUpdate, SchoolResponse
from .user import UserBase, UserCreate, UserUpdate, UserResponse
from .device import DeviceBase, DeviceCreate, DeviceUpdate, DeviceResponse
from .login_audit import LoginAuditBase, LoginAuditCreate, LoginAuditResponse
from .challenge import ChallengeBase, ChallengeCreate, ChallengeUpdate, ChallengeResponse
from .submission import SubmissionBase, SubmissionCreate, SubmissionUpdate, SubmissionResponse
from .ai_verification import AIVerificationBase, AIVerificationCreate, AIVerificationUpdate, AIVerificationResponse
from .badge import BadgeBase, BadgeCreate, BadgeUpdate, BadgeResponse
from .user_badge import UserBadgeBase, UserBadgeCreate, UserBadgeResponse
from .leaderboard import LeaderboardBase, LeaderboardCreate, LeaderboardUpdate, LeaderboardResponse
from .school_trust_score import SchoolTrustScoreBase, SchoolTrustScoreCreate, SchoolTrustScoreUpdate, SchoolTrustScoreResponse
from .school_trust_factor import SchoolTrustFactorBase, SchoolTrustFactorCreate, SchoolTrustFactorUpdate, SchoolTrustFactorResponse
from .trust_score_history_user import TrustScoreHistoryUserBase, TrustScoreHistoryUserCreate, TrustScoreHistoryUserResponse
from .trust_score_history_school import TrustScoreHistorySchoolBase, TrustScoreHistorySchoolCreate, TrustScoreHistorySchoolResponse
from .security_event import SecurityEventBase, SecurityEventCreate, SecurityEventUpdate, SecurityEventResponse
