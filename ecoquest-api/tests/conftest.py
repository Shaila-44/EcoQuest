"""EcoQuest API — Test Configuration.

Shared fixtures for test database, client, and factories.
"""

import pytest


@pytest.fixture
def anyio_backend():
    """Use asyncio for all async tests."""
    return "asyncio"


# TODO: Add fixtures:
# - async_session: Test database session (uses test DB or SQLite)
# - client: AsyncClient for integration tests
# - sample_user: Factory-generated test user
# - sample_challenge: Factory-generated test challenge
