# PiNodeAI Backend (pie-node-backend)

Node.js backend API for the PiNodeAI website frontend. Provides REST endpoints for content (services, portfolio, blog, team, FAQs, stats) and form submissions (contact, newsletter).

## Requirements

- Node.js >= 20
- npm or pnpm

## Setup

```bash
cd pie-node-backend
npm install
cp .env.example .env
# Edit .env if needed (PORT, CORS_ORIGINS)
```

## Scripts

- `npm run dev` – Start dev server with hot reload (tsx watch)
- `npm run build` – Compile TypeScript to `dist/`
- `npm start` – Run production build (`node dist/server.js`)
- `npm run typecheck` – Type check only

## Environment

| Variable      | Default              | Description                    |
|---------------|----------------------|--------------------------------|
| `PORT`        | `3000`               | Server port                    |
| `NODE_ENV`     | `development`       | Environment                    |
| `MONGODB_URI`  | **(required)**      | MongoDB connection string      |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins |

Set `MONGODB_URI` in `.env` to your MongoDB Atlas (or other) connection string. Never commit `.env` or real credentials.

## API Base URL

- Local: `http://localhost:3000`
- All APIs are under `/api/v1`

## Endpoints

### Content (GET)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/services` | List all services |
| GET | `/api/v1/services/:slug` | Get service by slug |
| GET | `/api/v1/portfolio` | List case studies |
| GET | `/api/v1/portfolio/:slug` | Get case study by slug |
| GET | `/api/v1/blog` | List blog posts |
| GET | `/api/v1/blog/:slug` | Get blog post by slug |
| GET | `/api/v1/team` | List team members |
| GET | `/api/v1/testimonials` | List testimonials |
| GET | `/api/v1/faqs` | List FAQs (optional `?category=general\|services\|pricing\|process`) |
| GET | `/api/v1/stats` | Company stats |
| GET | `/api/v1/config` | Company config (name, tagline, contact, social) |

### Forms (POST)

| Method | Path | Body | Description |
|--------|------|------|-------------|
| POST | `/api/v1/contact` | `{ name, email, message, phone?, serviceInterest? }` | Contact form |
| POST | `/api/v1/newsletter` | `{ email }` | Newsletter signup |

### API documentation (Swagger)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api-docs` | Swagger UI – browse and try all APIs |
| GET | `/api-docs.json` | OpenAPI 3.0 spec (JSON) |

### Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health/live` | Liveness probe |
| GET | `/health/ready` | Readiness probe |

## Frontend integration

Point the frontend to this backend:

1. **Contact form**: `POST http://localhost:3000/api/v1/contact` with JSON body (same shape as current `/api/contact`).
2. **Newsletter**: `POST http://localhost:3000/api/v1/newsletter` with `{ "email": "..." }`.

Optional: use the GET endpoints to load services, portfolio, blog, etc. from the API instead of static constants (e.g. set `NEXT_PUBLIC_API_URL=http://localhost:3000` and fetch from `/api/v1/services`, etc.).

## Project structure

```
src/
├── app.ts              # Express app, middleware, route mounting
├── server.ts           # HTTP server, graceful shutdown
├── config/             # Configuration
├── controllers/        # Request handlers
├── data/               # Seed data and getters (swap for DB later)
├── middleware/         # requestId, errorHandler
├── routes/             # Route definitions
├── types/              # Shared types
├── validators/         # Zod schemas (contact, newsletter)
└── logger.ts           # Pino logger
```

## Database (MongoDB)

Content is stored in MongoDB. Use the seed script to load initial data from `src/data/seed.json`:

```bash
# After setting MONGODB_URI in .env
npm run seed
```

This creates/overwrites collections: `services`, `case_studies`, `team_members`, `testimonials`, `blog_posts`, `faqs`, `company_stats`, and `config`. Contact form submissions and newsletter signups are stored in `contact_submissions` and `newsletter_subscribers`.

## Contact / Newsletter

Submissions are validated and logged. To send email or persist:

- Set `RESEND_API_KEY` (or similar) and implement sending in `contactController.ts` and `newsletterController.ts`, or
- Add a database and store submissions for later processing.
