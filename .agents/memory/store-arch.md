---
name: Store architecture
description: Online store monorepo — key design decisions, env vars, and route conventions
---

# Store Architecture

## Stack
- Frontend: React + Vite + Tailwind v4 + ShadcnUI + Wouter, at `/store/`
- Backend: Express v5 ESM, at `/api`
- DB: Replit PostgreSQL via Drizzle ORM
- API codegen: Orval from `lib/api-spec/openapi.yaml` → `lib/api-client-react/` + `lib/api-zod/`

## Database
- Uses **Neon PostgreSQL** (external), not Replit's built-in DB
- Connection string stored in `APP_DATABASE_URL` env var (shared) — takes priority over Replit's runtime-managed `DATABASE_URL` (which cannot be overridden)
- `lib/db/src/index.ts` and `lib/db/drizzle.config.ts` both check `APP_DATABASE_URL ?? DATABASE_URL`

## Required secrets
- `PAYSTACK_SECRET_KEY` — used in `artifacts/api-server/src/routes/checkout.ts` as `process.env.PAYSTACK_SECRET_KEY`
  - NOTE: the env var in the code was changed from `PAYSTACK_API_KEY` to `PAYSTACK_SECRET_KEY` to match the secret name

## Products schema
- `images TEXT[]` column stores up to 3 product image URLs for the detail page gallery
- `image_url TEXT` kept for backward compat (= images[0])
- `name TEXT UNIQUE` — unique constraint added (2026-07-24) to support safe upsert seeding
- Frontend uses `product.images?.[0] || product.imageUrl` in Catalog cards
- ProductDetail.tsx has full gallery: main image + thumbnail row, `selectedImageIdx` state

## Seed script (lib/db/src/seed.ts)
- Uses INSERT … ON CONFLICT (name) DO UPDATE — safe to re-run even with existing orders
- Never deletes products; updates in-place by name so FK references (order_items) stay intact
- Unique constraint must exist on `products.name` in the target DB before seed runs
  - Applied to Neon DB via raw SQL (drizzle-kit push needs TTY, not usable in CI/shell)

## CORS (artifacts/api-server/src/app.ts)
- `bigdealsnigeria.shop` and `www.bigdealsnigeria.shop` are hardcoded in allowedOrigins
- Additional origins can be added via FRONTEND_URL env var (comma-separated)
- Always uses the allowedOrigins array (not `origin: true`); add new domains to the array

## Production deployment
- API: Railway — `workspaceapi-server-production-974e.up.railway.app` (auto-deploys from GitHub main)
- Frontend: Vercel — `bigdealsnigeria.shop` (auto-deploys from GitHub main)
- VITE_API_BASE_URL on Vercel = Railway API URL (already set)

## Codegen workflow (critical path)
After any OpenAPI spec change:
```
pnpm run --filter @workspace/api-spec codegen
```
Then rebuild + restart API Server workflow.

**Why:** The route handlers use generated Zod schemas from `@workspace/api-zod` for request/response validation. If the spec changes but codegen hasn't run, the runtime Zod parse will reject the new fields.

## Prices
All prices stored in kobo (1 NGN = 100 kobo). `formatNaira(priceKobo)` in `lib/utils` handles display.

## Mock data helpers
`artifacts/store/src/lib/jumia-mock.ts` — generates deterministic discount %, ratings, and review counts per product ID. These are display-only fakes; real data comes from the DB.

## Deployment state (as of 2026-07-22)
- **Vercel project**: `jumia-ng-store` (id: `prj_jJ4Z72KUsNSBa5uyjRKSBrcFy472`), team `team_SAIjf9406w3sUHXSVmf4Vwpf`
  - GitHub repo `SpaceXStarlinkHQ/Jumia` linked, auto-deploys on push to `main`
  - `BASE_PATH=/` and `NODE_ENV=production` set
  - **Missing**: `VITE_API_BASE_URL` — must be set after API is deployed
- **Railway project**: `spirited-adventure` (id: `9cbd5094-6162-4462-af88-d6cf0d500869`)
  - `@workspace/api-server` service id: `3f087eeb-0c47-4fe0-9b38-dda81cd69c42`, env id: `d6741445-7e00-429a-bd8f-7aef01d07679`
  - **Blocked**: Railway free plan can't provision Postgres or deploy — needs Hobby upgrade ($5/mo)
  - `NODE_ENV=production` set via `variableCollectionUpsert`; build/start commands set via `serviceInstanceUpdate`
- **Recommended path**: Publish API on Replit (autoscale, already configured), use `*.replit.app` URL as `VITE_API_BASE_URL` on Vercel

## How to complete Vercel wiring (once API URL is known)
```bash
VERCEL_TOKEN="..." TEAM_ID="team_SAIjf9406w3sUHXSVmf4Vwpf" PROJECT_ID="prj_jJ4Z72KUsNSBa5uyjRKSBrcFy472"
# Add VITE_API_BASE_URL env var
curl -X POST "https://api.vercel.com/v10/projects/$PROJECT_ID/env?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" -H "Content-Type: application/json" \
  -d '[{"key":"VITE_API_BASE_URL","value":"<API_URL>","type":"plain","target":["production","preview"]}]'
# Then trigger a deployment via GitHub push or Vercel redeploy API
```
