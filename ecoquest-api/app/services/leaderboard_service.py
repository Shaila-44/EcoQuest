async def get_overall_leaderboard(
    self,
    limit: int = 50,
) -> list[Leaderboard]:
    """Fetch overall top student leaderboard with 10-second TTL caching."""
    cache_key = f"overall_{limit}"
    now = time.monotonic()

    if cache_key in _LEADERBOARD_CACHE:
        cached_time, cached_data = _LEADERBOARD_CACHE[cache_key]
        if now - cached_time < CACHE_TTL_SECONDS:
            return cached_data

    ranks = await self.leaderboard_repo.get_global(limit)
    _LEADERBOARD_CACHE[cache_key] = (now, ranks)
    return ranks


async def get_school_leaderboard(
    self,
    school_id: uuid.UUID,
    limit: int = 50,
) -> list[Leaderboard]:
    """Fetch school leaderboard with 10-second TTL caching."""
    cache_key = f"school_{school_id}_{limit}"
    now = time.monotonic()

    if cache_key in _LEADERBOARD_CACHE:
        cached_time, cached_data = _LEADERBOARD_CACHE[cache_key]
        if now - cached_time < CACHE_TTL_SECONDS:
            return cached_data

    ranks = await self.leaderboard_repo.get_by_school(
        school_id,
        limit=limit,
    )
    _LEADERBOARD_CACHE[cache_key] = (now, ranks)
    return ranks