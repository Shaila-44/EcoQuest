# EcoQuest 🌱

> AI-Powered Environmental Education Platform for Schools

EcoQuest gamifies environmental education by challenging students to complete real-world eco activities, verify them with AI, and compete on leaderboards — all within a school-managed platform.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend | FastAPI, Python 3.12, SQLAlchemy 2.0, Alembic |
| Database | PostgreSQL 16 |
| AI Pipeline | OpenCV, EasyOCR, Gemini Vision API |
| Storage | Cloudinary |
| Auth | JWT (access + refresh tokens), RBAC |

## Project Structure

```
EcoQuest/
├── ecoquest-api/       # FastAPI backend
├── ecoquest-web/       # Next.js frontend
└── docker-compose.yml  # Local development environment
```

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)

### Local Development

1. **Clone & install**
   ```bash
   git clone <repo-url> && cd EcoQuest
   ```

2. **Start infrastructure**
   ```bash
   docker compose up -d postgres
   ```

3. **Backend**
   ```bash
   cd ecoquest-api
   cp .env.example .env          # Edit with your values
   pip install -e ".[dev]"
   alembic upgrade head
   python scripts/seed.py
   make dev
   ```

4. **Frontend**
   ```bash
   cd ecoquest-web
   cp .env.example .env.local    # Edit with your values
   npm install
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## API Documentation

Once the backend is running, visit [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger UI.

## Team

| Role | Responsibilities |
|------|-----------------|
| Tech Lead | Architecture, auth, CI/CD, database |
| Backend Engineer | AI pipeline, business logic, APIs |
| Frontend Engineer | Dashboard UI, forms, responsive design |
| Full-Stack / QA | Gamification, leaderboards, testing |

## License

Proprietary — All rights reserved.
