# BigDeals Nigeria — E-Commerce Storefront

A Jumia-style Nigerian e-commerce platform with a React/Vite storefront, Express API backend, PostgreSQL database, and Paystack payments.

## Project structure

```
artifacts/
  api-server/   Express API (port 8080 in dev, /api in preview)
  store/        React/Vite storefront (port 5173 in dev, /store/ in preview)
  mockup-sandbox/ Design/component preview tool
lib/
  db/           Drizzle ORM schema + migrations + seed
  api-spec/     OpenAPI spec
  api-zod/      Zod schemas generated from spec
  api-client-react/ React Query hooks for the API
```

## Running locally on Replit

Both services start automatically via configured workflows:

- **API Server** — `PORT=8080 pnpm --filter @workspace/api-server run dev`
- **Store** — `PORT=5173 BASE_PATH=/store/ pnpm --filter @workspace/store run dev`

The Vite dev server proxies `/api` → `http://localhost:8080` so the frontend and backend communicate without extra config.

## Required secrets

| Secret | Purpose |
|--------|---------|
| `APP_DATABASE_URL` | PostgreSQL connection string |
| `PAYSTACK_SECRET_KEY` | Paystack secret key (`sk_live_…` or `sk_test_…`) |
| `SESSION_SECRET` | Random string for session signing |

## Database

Uses Drizzle ORM with PostgreSQL.

```bash
# Push schema changes
pnpm --filter @workspace/db run push

# Seed products
pnpm --filter @workspace/db run seed
```

## Deployment

See `DEPLOYMENT.md` for full instructions — the API deploys to Railway and the storefront to Vercel.

## User preferences

<!-- Agent: save user preferences here -->
