.PHONY: dev test lint format migrate seed

# Start development server with auto-reload
dev:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run all tests
test:
	pytest tests/ -v --cov=app --cov-report=term-missing

# Run unit tests only
test-unit:
	pytest tests/unit/ -v

# Run integration tests only
test-integration:
	pytest tests/integration/ -v

# Lint with ruff
lint:
	ruff check app/ tests/
	ruff format --check app/ tests/
	mypy app/

# Auto-format code
format:
	ruff check --fix app/ tests/
	ruff format app/ tests/

# Create a new Alembic migration
migrate-create:
	alembic revision --autogenerate -m "$(msg)"

# Apply all pending migrations
migrate:
	alembic upgrade head

# Rollback last migration
migrate-rollback:
	alembic downgrade -1

# Seed the database
seed:
	python scripts/seed.py

# Create initial admin user
create-admin:
	python scripts/create_admin.py
