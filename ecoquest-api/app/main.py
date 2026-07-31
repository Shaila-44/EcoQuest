"""EcoQuest API — Application Factory.

Creates and configures the FastAPI application with all middleware,
exception handlers, and route registrations.
"""

from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api.v1.router import api_v1_router
from app.core.exception_handlers import register_exception_handlers
from app.core.middleware import RequestIdMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Application lifespan — startup and shutdown events."""
    # Startup
    yield
    # Shutdown


def create_app() -> FastAPI:
    """Application factory — creates and configures the FastAPI app."""
    application = FastAPI(
        title="EcoQuest API",
        description="AI-Powered Environmental Education Platform",
        version="0.1.0",
        docs_url="/docs" if settings.ENVIRONMENT == "development" else None,
        redoc_url="/redoc" if settings.ENVIRONMENT == "development" else None,
        lifespan=lifespan,
    )

    # --- Middleware (order matters: last added = first executed) ---
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.add_middleware(RequestIdMiddleware)

    # --- Exception Handlers ---
    register_exception_handlers(application)

    # --- Routers ---
    application.include_router(api_v1_router, prefix="/api/v1")

    return application


app = create_app()
