# BigDeals Nigeria

A Jumia-style Nigerian e-commerce platform with a React storefront, Express API backend, PostgreSQL database, and Paystack payments.

## Stack

- **Frontend**: React + Vite + Tailwind CSS + Radix UI + Framer Motion + TanStack Query + Wouter
- **Backend**: Node.js + Express v5 + Pino logging
- **Database**: PostgreSQL 16 with Drizzle ORM (Replit built-in PostgreSQL — no external DB needed)
- **Payments**: Paystack
- **Package manager**: pnpm (monorepo with workspaces)
- **API**: OpenAPI spec-driven, Orval-generated React Query hooks, Zod validation

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
scripts/
  post-merge.sh — Runs automatically after task merges (install + DB push + seed)
```

## How to run

Both workflows are configured and managed by Replit:

- **API Server** — `pnpm --filter @workspace/api-server run dev`
- **Online Store** — `pnpm --filter @workspace/store run dev`

## First-time setup (after cloning / importing)

```bash
# 1. Install all workspace dependencies
pnpm install

# 2. Push schema to the Replit-managed PostgreSQL database
pnpm --filter @workspace/db run push

# 3. Seed 33 sample products across 10 categories
pnpm --filter @workspace/db run seed
```

Then start both workflows and the app is ready at `/store/`.

## Database commands

```bash
# Push schema changes (interactive — prompts on destructive ops)
pnpm --filter @workspace/db run push

# Push schema changes non-interactively (CI / post-merge)
pnpm --filter @workspace/db run push-force

# Seed with sample products (idempotent — clears and re-inserts)
pnpm --filter @workspace/db run seed
```

## Required secrets

Set these in the **Replit Secrets** panel before starting the server:

| Secret | Description |
|---|---|
| `PAYSTACK_SECRET_KEY` | Paystack secret key — find it in Paystack Dashboard → Settings → API Keys |
| `SESSION_SECRET` | Session signing key — any long random string |

> **Database**: Uses Replit's built-in PostgreSQL 16 (the `postgresql-16` Nix module). Connection is auto-resolved from Replit-managed env vars (`PGHOST`/`PGUSER`/`PGDATABASE`). No `DATABASE_URL` needed on Replit.

## User preferences

- Keep the existing monorepo structure and stack.
