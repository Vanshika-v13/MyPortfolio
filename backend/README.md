# Portfolio Backend

Production-ready REST API for a premium developer portfolio website.

## Project Overview

This backend powers a developer portfolio frontend with versioned JSON endpoints for projects, certificates, and contact submissions. It is built with Express and MongoDB using a clear MVC layout: routes define endpoints, controllers handle request/response logic, models define persistence, and middleware covers cross-cutting concerns (security, validation, rate limiting, and errors).

**Core capabilities**

- Health monitoring with database connection status
- Read-only portfolio content (projects and certificates) with consistent `{ success, data }` responses
- Contact form intake with validation, sanitization, and per-IP rate limiting
- Production hardening: Helmet, CORS, compression, global rate limits, graceful shutdown

**Quality assurance**

Run the automated QA suite after starting the server and seeding the database:

```bash
npm run qa
```

The script verifies all routes, error formats, sorting, rate limits, and compression. Exit code `0` means all checks passed.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- express-validator
- helmet, cors, express-rate-limit
- dotenv, morgan, compression

## Project Structure

```
backend/
├── src/
│   ├── config/         # Database and app configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── scripts/        # Operational scripts (QA verification)
│   ├── seed/           # Database seed scripts
│   │   └── data/       # Seed data for projects and certificates
│   ├── utils/          # Shared utilities (AppError, asyncHandler)
│   ├── app.js          # Express application setup
│   └── server.js       # Server entry point
├── .env.example
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

```bash
cd backend
npm install
cp .env.example .env
```

### Environment Variables

All four variables are **required**. The server will not start if any are missing or invalid.

| Variable     | Description                                      | Example                              |
|--------------|--------------------------------------------------|--------------------------------------|
| `PORT`       | HTTP port (positive integer)                     | `5000`                               |
| `MONGODB_URI`| MongoDB connection string                        | `mongodb://localhost:27017/portfolio`|
| `NODE_ENV`   | Runtime environment (`development` or `production`) | `development`                     |
| `CLIENT_URL` | Allowed frontend origin for CORS                 | `http://localhost:3000`              |

Example `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

For production, set `NODE_ENV=production` and point `CLIENT_URL` to your deployed frontend URL (e.g. `https://yourportfolio.com`).

## Run Commands

```bash
# Development (verbose logs, auto-reload via nodemon)
npm run dev

# Production
npm start

# Seed database with sample projects and certificates
npm run seed

# Run automated QA verification (server must be running)
npm run qa
```

The seed script clears existing project and certificate records and inserts fresh seed data. It does not affect contact submissions.

`npm run qa` exercises every public endpoint and reports pass/fail for health, projects, certificates, contact validation, rate limiting, error formats, and gzip compression.

## Available Routes

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| GET    | `/api/v1/health`            | Health and status check        |
| GET    | `/api/v1/projects`          | List all projects              |
| GET    | `/api/v1/projects/:slug`    | Get project by slug            |
| GET    | `/api/v1/certificates`      | List all certificates          |
| POST   | `/api/v1/contact`           | Submit contact form            |

## API Response Format

### Success (data endpoints)

```json
{
  "success": true,
  "data": "..."
}
```

### Success (contact submission)

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### Failure

```json
{
  "success": false,
  "message": "Error description"
}
```

### Validation failure

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

---

### Health Check

```
GET /api/v1/health
```

Response:

```json
{
  "success": true,
  "environment": "production",
  "uptime": "3600s",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

---

### Projects

#### List all projects

```
GET /api/v1/projects
```

Returns all projects sorted with featured projects first, then newest first.

Response:

```json
{
  "success": true,
  "data": [
    {
      "title": "Portfolio Platform",
      "slug": "portfolio-platform",
      "shortDescription": "...",
      "fullDescription": "...",
      "thumbnail": "/images/projects/portfolio-platform-thumb.jpg",
      "techStack": ["React", "Node.js"],
      "githubUrl": "https://github.com/example/portfolio-platform",
      "liveDemoUrl": "https://portfolio.example.com",
      "features": ["..."],
      "architecture": "...",
      "challenges": ["..."],
      "learnings": ["..."],
      "galleryImages": ["..."],
      "featured": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get project by slug

```
GET /api/v1/projects/:slug
```

Returns a single project matching the slug. Responds with `404` if not found.

Response:

```json
{
  "success": true,
  "data": {
    "title": "Portfolio Platform",
    "slug": "portfolio-platform"
  }
}
```

Not found:

```json
{
  "success": false,
  "message": "Project not found"
}
```

---

### Certificates

#### List all certificates

```
GET /api/v1/certificates
```

Returns all certificates sorted newest first by issue date.

Response:

```json
{
  "success": true,
  "data": [
    {
      "title": "MongoDB Node.js Developer",
      "issuer": "MongoDB University",
      "issueDate": "2024-11-15T00:00:00.000Z",
      "credentialUrl": "https://credentials.example.com/mongodb-node",
      "thumbnail": "/images/certificates/mongodb-node.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Contact

#### Submit contact form

```
POST /api/v1/contact
```

Accepts public contact form submissions. Rate limited to **5 requests per IP** every **15 minutes**.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I would like to discuss a project opportunity."
}
```

Success response (`201`):

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

Validation error (`400`):

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

Rate limit exceeded (`429`):

```json
{
  "success": false,
  "message": "Too many contact requests. Please try again later."
}
```

Field rules:

| Field     | Rules                                   |
|-----------|-----------------------------------------|
| `name`    | Required, 2–100 characters, trimmed     |
| `email`   | Required, valid email, stored lowercase   |
| `message` | Required, 10–2000 characters, trimmed   |

---

## Production Features

### Security

- **Helmet** — Sets secure HTTP headers; CSP disabled for JSON API, cross-origin resource policy enabled for frontend access
- **CORS** — Only `CLIENT_URL` is allowed; unauthorized origins receive `403`
- **Rate limiting** — Global limit (100 req / 15 min) plus contact-specific limit (5 req / 15 min)
- **Input sanitization** — Contact route strips MongoDB operators and nested objects
- **JSON strict mode** — Rejects malformed or oversized payloads (50 KB limit)

### Performance

- **Compression** — gzip for responses over 1 KB
- **MongoDB indexes** — `projects` (slug unique, featured + createdAt), `certificates` (issueDate + createdAt), `contacts` (createdAt)
- **Lean queries** — Read endpoints use `.lean()` for plain objects without Mongoose document overhead

### Logging

| Environment   | Morgan format | Detail                          |
|---------------|---------------|---------------------------------|
| `development` | `dev`         | Verbose, colorized request logs |
| `production`  | `combined`    | Concise Apache-style access log |

### Database Connection

- Retries up to **5 times** with a **5-second** delay between attempts
- Server exits safely if all connection attempts fail
- On `SIGINT` / `SIGTERM`: HTTP server closes, MongoDB connection closes, shutdown status is logged

## Deployment Notes

### General

1. Set all required environment variables on your hosting platform
2. Set `NODE_ENV=production`
3. Set `CLIENT_URL` to your deployed frontend URL (include protocol, no trailing slash)
4. Use a managed MongoDB service (e.g. MongoDB Atlas) and set `MONGODB_URI`
5. Run `npm run seed` once after first deploy to populate projects and certificates
6. Start with `npm start`

### Platform Examples

**Render / Railway / Fly.io**

- Build command: `npm install`
- Start command: `npm start`
- Add environment variables in the platform dashboard
- Enable health check path: `/api/v1/health`

**MongoDB Atlas**

- Whitelist your server's IP (or allow `0.0.0.0/0` for cloud platforms with dynamic IPs)
- Use the Atlas connection string as `MONGODB_URI`

### Pre-Deploy Checklist

- [ ] `PORT`, `MONGODB_URI`, `NODE_ENV`, `CLIENT_URL` are set
- [ ] `NODE_ENV` is `production`
- [ ] `CLIENT_URL` matches the live frontend URL exactly
- [ ] MongoDB is reachable from the deployment environment
- [ ] `npm run seed` has been run (projects and certificates populated)
- [ ] `GET /api/v1/health` returns `database: "connected"`

## Final Validation Checklist

Run these after setup or deployment:

```bash
# 1. Start the server
npm run dev          # development
npm start            # production

# 2. Seed the database (first time only)
npm run seed

# 3. Run automated QA (recommended)
npm run qa

# 4. Or verify endpoints manually
curl http://localhost:5000/api/v1/health
curl http://localhost:5000/api/v1/projects
curl http://localhost:5000/api/v1/projects/portfolio-platform
curl http://localhost:5000/api/v1/certificates
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"I would like to discuss a project opportunity."}'
```

| Check                              | Expected result                          |
|------------------------------------|------------------------------------------|
| `npm run qa`                       | `14/14 passed`, exit code `0`            |
| `GET /api/v1/health`               | `success: true`, `database: "connected"` |
| `GET /api/v1/projects`             | `success: true` with `data` array        |
| `GET /api/v1/projects/`            | Same as `/projects` (trailing slash)     |
| `GET /api/v1/projects/:slug`       | `success: true` with project `data`      |
| `GET /api/v1/certificates`         | `success: true` with `data` array        |
| `POST /api/v1/contact` (valid)     | `201`, `message: "Message sent successfully"` |
| `POST /api/v1/contact` (invalid)   | `400` with `errors` array                |
| Missing env vars on startup        | Process exits with error message         |
| `SIGINT` / `SIGTERM`               | Graceful shutdown logged                 |

See [BACKEND_READINESS_REPORT.md](./BACKEND_READINESS_REPORT.md) for the full QA summary and deployment readiness assessment.

## Architecture

This project follows MVC:

- **Models** — Mongoose schemas and data layer
- **Views** — JSON API responses (no server-rendered views)
- **Controllers** — Business logic and response formatting
- **Routes** — Endpoint mapping and middleware chains

Async controllers use `asyncHandler` to forward errors to centralized `errorMiddleware`. Custom `AppError` instances provide consistent status codes and messages for missing resources.

## License

ISC
