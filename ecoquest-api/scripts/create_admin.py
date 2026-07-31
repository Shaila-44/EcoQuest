"""EcoQuest API — Create Admin User Script.

Usage: python scripts/create_admin.py
"""

import asyncio


async def create_admin() -> None:
    """Create the initial admin user.

    TODO: Implement:
    - Prompt for email and password
    - Hash password
    - Insert admin user into database
    """
    print("Creating admin user...")
    print("TODO: Implement admin creation logic")
    print("Done.")


if __name__ == "__main__":
    asyncio.run(create_admin())
