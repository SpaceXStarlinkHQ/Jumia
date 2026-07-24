# BigDeals Nigeria — Jumia Store Clone

Full-stack Nigerian e-commerce platform built as a TypeScript pnpm monorepo.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + Tailwind CSS v4 + ShadcnUI + Wouter |
| Backend | Express.js v5 (ESM) |
| Database | PostgreSQL via Neon, Drizzle ORM |
| API contracts | OpenAPI 3.1 + Orval codegen |
| Payments | Paystack |

## Project structure

```
artifacts/
  store/          React storefront  (port 5173, path /store/)
  api-server/     Express API       (port 8080, path /api)
lib/
  db/             Drizzle schema, migrations, seed, fix-images scripts
  api-spec/       OpenAPI YAML + Orval codegen config
  api-zod/        Generated Zod validators
  api-client-react/ Generated React Query hooks
scripts/          Maintenance utilities
```

## Running locally

```bash
pnpm install                              # install all workspace deps
pnpm --filter @workspace/db run push      # sync DB schema
pnpm --filter @workspace/db run seed      # seed product data
# start both services (already configured as Replit workflows)
```

## Required secrets

| Secret | Purpose |
|---|---|
| `APP_DATABASE_URL` | Neon PostgreSQL connection string |
| `SESSION_SECRET` | Express session signing key |
| `PAYSTACK_SECRET_KEY` | Payment processing |
| `VERCEL_TOKEN` | Deployment (optional) |
| `RAILWAY_TOKEN` | Deployment alternative (optional) |

## Image proxy

Product images are fetched server-side via `/api/image-proxy?url=<encoded>` to bypass hotlink protection on external CDNs. The frontend helper is at `artifacts/store/src/lib/imageProxy.ts`.

## Database scripts

```bash
pnpm --filter @workspace/db run push          # push schema changes
pnpm --filter @workspace/db run seed          # (re)seed all products
pnpm --filter @workspace/db run fix-images    # patch broken image URLs
```

## API codegen (after changing openapi.yaml)

```bash
pnpm --filter @workspace/api-spec codegen
```

## User preferences

- Keep existing project structure — do not restructure or migrate to a different stack.
