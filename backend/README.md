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

## API

All endpoints are versioned under `/api/v1`.

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

## Architecture

This project follows MVC:

- **Models** — Mongoose schemas and data layer
- **Views** — JSON API responses (no server-rendered views)
- **Controllers** — Business logic and response formatting
- **Routes** — Endpoint mapping and middleware chains

## License

ISC
