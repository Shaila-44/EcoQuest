#!/bin/bash
set -e

echo "Starting deployment checks..."

# Wait for database using Python to avoid needing pg_isready installed in the container
# But docker-compose 'depends_on' with 'service_healthy' already handles this!
# However, for idempotency and safety if run without docker-compose, we can just let Alembic retry or fail fast.

echo "Running Alembic migrations..."
alembic upgrade head

echo "Starting FastAPI application with Uvicorn..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
