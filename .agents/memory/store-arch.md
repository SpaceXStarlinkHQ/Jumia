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
- Preview setup requires `APP_DATABASE_URL` to be a complete, resolvable PostgreSQL URL; an invalid external value blocks catalog queries even though the API health endpoint still starts successfully
  **Why:** The API initializes its pool lazily enough for `/api/healthz` to pass before database-backed routes reveal connection failures.
  **How to apply:** Validate the external URL by restarting the API and checking `/api/products` before troubleshooting application code; only fall back to `DATABASE_URL` intentionally.

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

## Image rendering rules
- Always use `proxyImage()` for ALL product images at render time — including Cart, Checkout, ProductDetail thumbnails/related products, and Catalog grids. Never render raw `imageUrl` directly.
- Use `<NoImage>` component (`artifacts/store/src/components/ui/no-image.tsx`) when images fail to load (onError) or when no URL exists. Never use `display:none` as the sole error handler.
- Add `loading="lazy"` to all product `<img>` tags.
- Fallback pattern: `<img onError={...} />` followed immediately by `<div hidden className="absolute inset-0"><NoImage /></div>`. Requires `relative` + `overflow-hidden` on the container.

## Image proxy (artifacts/store/src/lib/imageProxy.ts)
- `proxyImage()` routes external image URLs through `/api/image-proxy`
- In production, uses `VITE_API_BASE_URL` (absolute) instead of relative `/api` — critical because Vercel frontend and Railway API are on different domains
- ALLOWED_HOSTS allowlist is in `artifacts/api-server/src/routes/imageProxy.ts` — add new CDN domains there

## pnpm lockfile overrides (CRITICAL for Railway)
- `pnpm.overrides` in `package.json` must match the lockfile's `overrides` section exactly
- Lockfile has platform-specific exclusions for esbuild, lightningcss, @tailwindcss/oxide, rollup, @expo/ngrok-bin
- Railway uses `pnpm i --frozen-lockfile`; mismatch → `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH` build failure
- If overrides are ever removed from package.json, regenerate lockfile locally before pushing

## Production deployment
- API: Railway — `workspaceapi-server-verceltoken.up.railway.app` (auto-deploys from GitHub main; environment named "VERCEL_TOKEN" in Railway dashboard)
- Frontend: Vercel — `bigdealsnigeria.shop` (auto-deploys from GitHub main)
- VITE_API_BASE_URL on Vercel = `https://workspaceapi-server-verceltoken.up.railway.app` (must include https://)

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
