"""EcoQuest API — V1 Router Aggregator.

Collects all v1 route modules into a single router.
"""

from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.challenges import router as challenges_router
from app.api.v1.submissions import router as submissions_router
from app.api.v1.reviews import router as reviews_router
from app.api.v1.leaderboard import router as leaderboard_router
from app.api.v1.gamification import router as gamification_router
from app.api.v1.health import router as health_router

api_v1_router = APIRouter()

api_v1_router.include_router(health_router, tags=["Health"])
api_v1_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_v1_router.include_router(users_router, prefix="/users", tags=["Users"])
api_v1_router.include_router(challenges_router, prefix="/challenges", tags=["Challenges"])
api_v1_router.include_router(submissions_router, prefix="/submissions", tags=["Submissions"])
api_v1_router.include_router(reviews_router, prefix="/reviews", tags=["Reviews"])
api_v1_router.include_router(leaderboard_router, prefix="/leaderboard", tags=["Leaderboard"])
api_v1_router.include_router(gamification_router, prefix="/gamification", tags=["Gamification"])
