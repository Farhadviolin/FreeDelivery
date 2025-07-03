# Auth Service

A modern authentication microservice for the FreeDelivery monorepo. Built with TypeScript, Express, TypeORM, Passport, JWT, and Redis.

## Features
- User registration and login
- JWT access/refresh tokens
- Redis-backed refresh token revocation
- TypeORM/Postgres user storage
- Passport local strategy
- TypeScript-first

## Usage

### Local Development
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set environment variables (see below).
3. Start Postgres and Redis (e.g. with Docker Compose).
4. Build and run:
   ```sh
   npm run build && npm start
   ```

### Docker
Build and run the service:
```sh
docker build -t auth-service .
docker run --env-file .env -p 4000:4000 auth-service
```

### Environment Variables
- `PORT` (default: 4000)
- `JWT_SECRET` (required)
- `REFRESH_SECRET` (required)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `REDIS_HOST`, `REDIS_PORT`

### Endpoints
- `POST /register` — Register new user
- `POST /login` — Login, returns tokens
- `POST /refresh` — Refresh access token
- `GET /me` — Get current user (JWT required)

---
See source for more details.
