"""EcoQuest API — Database Seed Script.

Usage: python scripts/seed.py
"""

import asyncio


async def seed() -> None:
    """Seed the database with initial data.

    TODO: Implement:
    - Create default admin user
    - Create sample school
    - Create badge definitions
    - Create sample challenges
    """
    print("Seeding database...")
    print("TODO: Implement seed logic")
    print("Done.")


if __name__ == "__main__":
    asyncio.run(seed())
