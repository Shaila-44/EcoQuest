"""Unit tests — Performance & Scalability (TTL Caching & Async Offloading)."""

from unittest.mock import AsyncMock, MagicMock

import pytest

from app.services.leaderboard_service import _LEADERBOARD_CACHE, LeaderboardService


@pytest.mark.asyncio
async def test_leaderboard_ttl_cache():
    """Verify LeaderboardService caches ranks for 10 seconds and invalidates on update."""
    mock_session = MagicMock()
    service = LeaderboardService(mock_session)

    dummy_ranks = [MagicMock(total_points=100), MagicMock(total_points=50)]
    service.leaderboard_repo.list_top_ranks = AsyncMock(return_value=dummy_ranks)

    _LEADERBOARD_CACHE.clear()

    # First call triggers repository query
    res1 = await service.get_overall_leaderboard(limit=10)
    assert res1 == dummy_ranks
    assert service.leaderboard_repo.list_top_ranks.call_count == 1

    # Second call uses in-memory TTL cache without calling repository
    res2 = await service.get_overall_leaderboard(limit=10)
    assert res2 == dummy_ranks
    assert service.leaderboard_repo.list_top_ranks.call_count == 1

    # Updating leaderboard invalidates cache
    service.leaderboard_repo.get_rank_for_user = AsyncMock(return_value=dummy_ranks[0])
    service.leaderboard_repo.update = AsyncMock()

    import uuid
    await service.update_leaderboard_entry(uuid.uuid4(), uuid.uuid4(), 10)

    # After update, cache is cleared so next fetch hits repository again
    res3 = await service.get_overall_leaderboard(limit=10)
    assert service.leaderboard_repo.list_top_ranks.call_count == 2
