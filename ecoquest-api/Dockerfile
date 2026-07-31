# ============================================
# EcoQuest API — Dockerfile
# Production-ready, secure multi-stage build
# ============================================

# --- Stage 1: Builder ---
FROM python:3.12-slim AS builder

WORKDIR /build

# Install system utilities needed to build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy pyproject.toml to extract project dependencies for build caching
COPY pyproject.toml .

# Extract project dependencies and pre-install them into /install directory
RUN python -c " \
import tomllib \
with open('pyproject.toml', 'rb') as f: \
    data = tomllib.load(f) \
deps = data.get('project', {}).get('dependencies', []) \
print('\n'.join(deps)) \
" > requirements.txt \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt

# Copy source code and build/install the current project package (without rebuilding deps)
COPY . .
RUN pip install --no-cache-dir --no-deps --prefix=/install .

# --- Stage 2: Runtime ---
FROM python:3.12-slim AS runtime

WORKDIR /app

# Install runtime system libraries (libpq for Postgres and OpenCV/EasyOCR dependencies)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy Python packages installed in builder
COPY --from=builder /install /usr/local

# Copy application code and migration files
COPY alembic.ini .
COPY alembic/ ./alembic/
COPY app/ ./app/
COPY scripts/ ./scripts/

# Create a non-privileged system user for security
RUN useradd -u 10001 --create-home appuser \
    && chown -R appuser:appuser /app

COPY start.sh .
RUN chmod +x start.sh

RUN useradd --create-home appuser && chown -R appuser /app
USER appuser

EXPOSE 8000

CMD ["./start.sh"]
