from __future__ import annotations

"""EcoQuest API — Session Repository."""

import hashlib
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.device_approval import DeviceApproval
from app.models.user_session import UserSession
from app.repositories.base import BaseRepository


def hash_token(token: str) -> str:
    """Generate SHA-256 hex digest of a refresh token."""
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


class SessionRepository(BaseRepository[UserSession]):
    """Data access layer for UserSession and DeviceApproval operations."""

    def __init__(self, session: AsyncSession):
        super().__init__(UserSession, session)

    async def create_session(
        self,
        user_id: uuid.UUID,
        refresh_token: str,
        device_id: str = "default-device",
        device_name: str = "Browser Session",
        expires_days: int = 7,
    ) -> UserSession:
        """Create and persist a new user session with SHA-256 token hash."""
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(days=expires_days)

        token_hash = hash_token(refresh_token)
        db_session = UserSession(
            user_id=user_id,
            device_id=device_id,
            device_name=device_name,
            refresh_token_hash=token_hash,
            is_active=True,
            created_at=now,
            last_active_at=now,
            expires_at=expires_at,
        )
        self.session.add(db_session)
        await self.session.flush()
        return db_session

    async def get_active_session_by_user(self, user_id: uuid.UUID) -> Optional[UserSession]:
        """Fetch the currently active session for a user."""
        now = datetime.now(timezone.utc)
        stmt = (
            select(UserSession)
            .where(
                UserSession.user_id == user_id,
                UserSession.is_active == True,
                UserSession.expires_at > now,
            )
            .order_by(UserSession.last_active_at.desc())
            .limit(1)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_session_by_token_hash(self, refresh_token: str) -> Optional[UserSession]:
        """Fetch active session by SHA-256 hash of refresh token."""
        token_hash = hash_token(refresh_token)
        now = datetime.now(timezone.utc)
        stmt = select(UserSession).where(
            UserSession.refresh_token_hash == token_hash,
            UserSession.is_active == True,
            UserSession.expires_at > now,
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def rotate_refresh_token(
        self,
        db_session: UserSession,
        new_refresh_token: str,
        expires_days: int = 7,
    ) -> UserSession:
        """Rotate session refresh token hash and update last active time."""
        now = datetime.now(timezone.utc)
        db_session.refresh_token_hash = hash_token(new_refresh_token)
        db_session.last_active_at = now
        db_session.expires_at = now + timedelta(days=expires_days)
        self.session.add(db_session)
        await self.session.flush()
        return db_session

    async def revoke_session(self, session_id: uuid.UUID) -> bool:
        """Revoke a specific session."""
        now = datetime.now(timezone.utc)
        stmt = (
            update(UserSession)
            .where(UserSession.session_id == session_id, UserSession.is_active == True)
            .values(is_active=False, revoked_at=now)
        )
        result = await self.session.execute(stmt)
        return result.rowcount > 0

    async def revoke_all_user_sessions(self, user_id: uuid.UUID) -> int:
        """Revoke all active sessions for a user."""
        now = datetime.now(timezone.utc)
        stmt = (
            update(UserSession)
            .where(UserSession.user_id == user_id, UserSession.is_active == True)
            .values(is_active=False, revoked_at=now)
        )
        result = await self.session.execute(stmt)
        return result.rowcount

    async def list_active_sessions(self, user_id: uuid.UUID) -> list[UserSession]:
        """Fetch all active sessions for a user."""
        now = datetime.now(timezone.utc)
        stmt = (
            select(UserSession)
            .where(
                UserSession.user_id == user_id,
                UserSession.is_active == True,
                UserSession.expires_at > now,
            )
            .order_by(UserSession.last_active_at.desc())
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    # --- Device Approval Request Methods ---

    async def create_device_approval(
        self,
        user_id: uuid.UUID,
        device_id: str,
        device_name: str,
        ip_address: Optional[str] = None,
        expire_minutes: int = 15,
    ) -> DeviceApproval:
        """Create a pending device approval request."""
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(minutes=expire_minutes)

        approval = DeviceApproval(
            user_id=user_id,
            device_id=device_id,
            device_name=device_name,
            ip_address=ip_address,
            status="PENDING",
            created_at=now,
            expires_at=expires_at,
        )
        self.session.add(approval)
        await self.session.flush()
        return approval

    async def get_pending_device_approvals(self, user_id: uuid.UUID) -> list[DeviceApproval]:
        """Get all pending device approval requests for a user."""
        now = datetime.now(timezone.utc)
        stmt = (
            select(DeviceApproval)
            .where(
                DeviceApproval.user_id == user_id,
                DeviceApproval.status == "PENDING",
                DeviceApproval.expires_at > now,
            )
            .order_by(DeviceApproval.created_at.desc())
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_device_approval_by_id(self, request_id: uuid.UUID) -> Optional[DeviceApproval]:
        """Fetch a device approval request by ID."""
        stmt = select(DeviceApproval).where(DeviceApproval.request_id == request_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
