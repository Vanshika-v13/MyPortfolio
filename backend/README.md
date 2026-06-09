# Portfolio Backend

Production-ready REST API for a premium developer portfolio website.

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
│   ├── seed/           # Database seed scripts
│   │   └── data/       # Seed data for projects and certificates
│   ├── utils/          # Shared utilities
│   ├── app.js          # Express application setup
│   └── server.js       # Server entry point
├── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Run

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

### Seed Database

Populate the database with sample projects and certificates:

```bash
npm run seed
```

This clears existing project and certificate records and inserts fresh seed data.

## API

All endpoints are versioned under `/api/v1`.

All successful responses use:

```json
{
  "success": true,
  "data": "..."
}
```

Error responses use:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Health Check

```
GET /api/v1/health
```

Response:

```json
{
  "success": true,
  "message": "Backend running successfully"
}
```

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

## Architecture

This project follows MVC:

- **Models** — Mongoose schemas and data layer
- **Views** — JSON API responses (no server-rendered views)
- **Controllers** — Business logic and response formatting
- **Routes** — Endpoint mapping and middleware chains

Async controllers use `asyncHandler` to forward errors to centralized `errorMiddleware`. Custom `AppError` instances provide consistent status codes and messages for missing resources.

## License

ISC
