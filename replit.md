# BigDeals Nigeria

A Jumia-style Nigerian e-commerce platform with a React storefront, Express API backend, PostgreSQL database, and Paystack payments.

## Stack

- **Frontend**: React + Vite + Tailwind CSS + Radix UI + Framer Motion + TanStack Query + Wouter
- **Backend**: Node.js + Express v5 + Pino logging
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Paystack
- **Package manager**: pnpm (monorepo with workspaces)
- **API**: OpenAPI spec-driven, Orval-generated React hooks, Zod validation

## Project structure

```
artifacts/
  api-server/   — Express API (port 8080, preview path /api)
  store/        — React storefront (port 5173, preview path /store/)
  mockup-sandbox/ — Vite design preview server
lib/
  db/           — Drizzle schema, migrations, seed data
  api-zod/      — Zod schemas generated from OpenAPI spec
  api-client/   — Orval-generated React Query hooks
```

## How to run

Both workflows are configured and managed by Replit:

- **API Server** — `pnpm --filter @workspace/api-server run dev`
- **Online Store** — `pnpm --filter @workspace/store run dev`

## Database commands

```bash
# Push schema changes
pnpm --filter @workspace/db run push

# Seed with sample products
pnpm --filter @workspace/db run seed
```

## Required secrets

| Secret | Description |
|---|---|
| `PAYSTACK_SECRET_KEY` | Paystack secret key for payments |
| `SESSION_SECRET` | Session signing key |

> `APP_DATABASE_URL` is optional — the API falls back to the Replit-managed `DATABASE_URL` automatically.

## User preferences

- Keep the existing monorepo structure and stack.
