import enum

class RoleName(str, enum.Enum):
    STUDENT = "Student"
    TEACHER = "Teacher"
    SCHOOL_ADMIN = "School Admin"
    SUPER_ADMIN = "Super Admin"

class UserStatus(str, enum.Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"

class LoginMethod(str, enum.Enum):
    EMAIL = "Email"
    MOBILE = "Mobile"
    GOOGLE = "Google"

class LoginStatus(str, enum.Enum):
    SUCCESS = "Success"
    FAILED = "Failed"

class SubmissionStatus(str, enum.Enum):
    PENDING = "Pending"
    VERIFIED = "Verified"
    REJECTED = "Rejected"

class VerificationStatus(str, enum.Enum):
    VERIFIED = "Verified"
    REJECTED = "Rejected"
    PENDING = "Pending"

class SeverityLevel(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
