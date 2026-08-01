import enum

class RoleName(str, enum.Enum):
    STUDENT = "Student"
    TEACHER = "Teacher"
    SCHOOL_ADMIN = "School Admin"
    SUPER_ADMIN = "Super Admin"

class UserStatus(str, enum.Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    DISABLED = "Disabled"
    SUSPENDED = "Suspended"


class LoginMethod(str, enum.Enum):
    EMAIL = "Email"
    MOBILE = "Mobile"
    GOOGLE = "Google"

class LoginStatus(str, enum.Enum):
    SUCCESS = "Success"
    FAILED = "Failed"

class SubmissionStatus(str, enum.Enum):
    PENDING = "Pending"
    PROCESSING = "Processing"
    APPROVED = "Approved"
    VERIFIED = "Verified"
    REJECTED = "Rejected"

class VerificationStatus(str, enum.Enum):
    VERIFIED = "Verified"
    APPROVED = "Approved"
    REJECTED = "Rejected"
    PENDING = "Pending"

class SeverityLevel(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
