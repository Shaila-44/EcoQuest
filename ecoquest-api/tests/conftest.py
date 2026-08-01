"""EcoQuest API — Test Configuration.

Shared fixtures for test database, client, and factories.
"""

from collections.abc import AsyncGenerator
import pytest
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.models.base import Base
import app.models  # Ensure all ORM models are registered with Base metadata


from httpx import ASGITransport, AsyncClient

from app.db.session import get_db
from app.main import create_app


@pytest.fixture
def anyio_backend():
    """Use asyncio for all async tests."""
    return "asyncio"


@pytest.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """In-memory SQLite async database session for testing."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with session_factory() as session:
        yield session

    await engine.dispose()


@pytest.fixture
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """AsyncClient fixture with overridden database session dependency."""
    application = create_app()

    async def _override_get_db():
        yield db_session

    application.dependency_overrides[get_db] = _override_get_db
    async with AsyncClient(transport=ASGITransport(app=application), base_url="http://testserver") as ac:
        yield ac
    application.dependency_overrides.clear()


