# Portfolio Backend

Production-ready REST API for a developer portfolio website.

## Project Overview

Node.js + Express + MongoDB API that serves portfolio content (projects, certificates) and accepts contact form submissions. Built with MVC architecture: routes map endpoints, controllers handle logic, models define persistence, middleware covers security, validation, and errors.

**Intentionally excluded:** authentication, admin panels, email delivery, background jobs, WebSockets, file uploads, and analytics.

## Folder Structure

```
backend/
├── src/
│   ├── config/         # Database connection
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Security, validation, rate limits, errors
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── scripts/        # QA verification script
│   ├── seed/           # Database seed scripts
│   │   └── data/       # Seed data files
│   ├── utils/          # AppError, asyncHandler
│   ├── app.js          # Express app setup
│   └── server.js       # Entry point, env validation, graceful shutdown
├── .env.example
├── package.json
└── README.md
```

## Installation Steps

**Prerequisites:** Node.js 18+, MongoDB (local or Atlas)

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your values before starting the server.

## Environment Variable Setup

All four variables are **required**. The server exits on startup if any are missing, empty, or invalid.

| Variable      | Description                         | Example                               |
|---------------|-------------------------------------|---------------------------------------|
| `PORT`        | HTTP port (positive integer)        | `5000`                                |
| `MONGODB_URI` | MongoDB connection string           | `mongodb://localhost:27017/portfolio` |
| `NODE_ENV`    | `development` or `production`       | `development`                         |
| `CLIENT_URL`  | Allowed frontend origin for CORS    | `http://localhost:3000`               |

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

For production: set `NODE_ENV=production` and `CLIENT_URL` to your live frontend URL (include protocol, no trailing slash).

## Available Scripts

| Script        | Command         | Description                              |
|---------------|-----------------|------------------------------------------|
| Start         | `npm start`     | Run server in production mode            |
| Development   | `npm run dev`   | Run with nodemon (auto-reload)           |
| Seed          | `npm run seed`  | Populate projects and certificates       |
| QA            | `npm run qa`    | Verify all endpoints (server must be running) |

## Run Instructions

```bash
# Development
npm run dev

# Production
npm start
```

On successful startup, the server logs port, environment, MongoDB status, and timestamp.

## Seed Instructions

```bash
npm run seed
```

- Requires `MONGODB_URI` in `.env`
- Clears existing projects and certificates, then inserts seed data
- Does **not** delete contact submissions
- Project slugs are unique — re-running seed replaces content safely via `deleteMany` before insert
- Exits with code `0` on success, `1` on failure

Run once after first deployment to populate content.

## API Routes

| Method | Endpoint                 | Description           |
|--------|--------------------------|-----------------------|
| GET    | `/api/v1/health`         | Health and DB status  |
| GET    | `/api/v1/projects`       | List all projects     |
| GET    | `/api/v1/projects/:slug` | Get project by slug   |
| GET    | `/api/v1/certificates`   | List all certificates |
| POST   | `/api/v1/contact`        | Submit contact form   |

### Response formats

**Success (data):** `{ "success": true, "data": [...] }`

**Success (contact):** `{ "success": true, "message": "Message sent successfully" }`

**Failure:** `{ "success": false, "message": "..." }`

**Validation:** `{ "success": false, "errors": [{ "field": "...", "message": "..." }] }`

### Health check

`GET /api/v1/health` returns:

```json
{
  "success": true,
  "environment": "production",
  "uptime": "3600s",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

### Contact field rules

| Field     | Rules                              |
|-----------|------------------------------------|
| `name`    | Required, 2–100 characters         |
| `email`   | Required, valid email              |
| `message` | Required, 10–2000 characters       |

Rate limited to 5 requests per IP every 15 minutes.

## Deployment Steps for Render

1. Create a new **Web Service** and connect your repository
2. Set **Root Directory** to `backend` (if monorepo)
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Add environment variables: `PORT` (Render sets this automatically), `MONGODB_URI`, `NODE_ENV=production`, `CLIENT_URL`
6. Set **Health Check Path** to `/api/v1/health`
7. Deploy, then run `npm run seed` once via Render Shell
8. Verify `GET /api/v1/health` returns `database: "connected"`

## Deployment Steps for Railway

1. Create a new project and deploy from your repository
2. Set **Root Directory** to `backend` (if monorepo)
3. Railway auto-detects Node.js — confirm **Start Command** is `npm start`
4. Add variables: `MONGODB_URI`, `NODE_ENV=production`, `CLIENT_URL` (Railway sets `PORT` automatically)
5. Deploy, then run `npm run seed` via Railway CLI or one-off command
6. Verify health endpoint responds with `success: true`

## Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| `Missing required environment variables` on startup | Set all four vars in `.env` or platform dashboard |
| `PORT must be a positive integer` | Ensure `PORT` is a valid number |
| `NODE_ENV must be one of: development, production` | Set `NODE_ENV` exactly to one of these values |
| MongoDB connection fails | Check `MONGODB_URI`, Atlas IP whitelist, and network access |
| CORS / `Origin not allowed` | `CLIENT_URL` must match frontend URL exactly (protocol, no trailing slash) |
| `database: "disconnected"` on health check | MongoDB unreachable — check connection string and credentials |
| Seed fails with duplicate key | Re-run `npm run seed` — it clears collections first; if error persists, check MongoDB permissions |
| Contact returns `429` | Rate limit exceeded — wait 15 minutes or test from a different IP |
| Port already in use locally | Stop the other process or change `PORT` in `.env` |

## Production Notes

### Security (active by default)

- **Helmet** — secure HTTP headers
- **CORS** — restricted to `CLIENT_URL`
- **Compression** — gzip for responses over 1 KB
- **Rate limiting** — global (100 req / 15 min) and contact-specific (5 req / 15 min)
- **Input sanitization** — contact route strips operator keys and nested objects
- **JSON limit** — 50 KB max payload, strict parsing

### Operations

- MongoDB connects with up to 5 retries (5 s apart)
- Graceful shutdown on `SIGINT` / `SIGTERM` — stops HTTP server, closes DB connection
- Morgan logging: `dev` format in development, `combined` in production
- `trust proxy` enabled for correct client IP behind load balancers (Render, Railway)

### VPS deployment

```bash
npm install
cp .env.example .env   # configure for production
npm run seed             # first time only
npm start                # or use pm2/systemd for process management
```

Use a reverse proxy (nginx) for HTTPS. Set health checks on `/api/v1/health`.

### Vercel Serverless (not supported as-is)

This backend is a long-running Node.js process with persistent MongoDB connections. Deploying to Vercel Serverless would require:

- Refactoring to serverless function handlers (no `server.listen`)
- Connection pooling or serverless-compatible MongoDB driver patterns
- Removing in-memory rate limit state (use external store)
- Adapting graceful shutdown (not applicable in serverless)

Use Render, Railway, or a VPS instead.

### Pre-deploy checklist

- [ ] All environment variables set
- [ ] `NODE_ENV=production`
- [ ] `CLIENT_URL` matches live frontend
- [ ] MongoDB reachable from host
- [ ] `npm run seed` completed
- [ ] Health check returns `database: "connected"`

See [BACKEND_READINESS_REPORT.md](./BACKEND_READINESS_REPORT.md) for the full deployment readiness assessment.

## License

ISC
