---
name: Railway deployment
description: Live Railway project details, service IDs, known build issues, and fixes for the Jumia API server deployment.
---

# Railway Deployment

## Project
- **Name:** hopeful-peace
- **Project ID:** `daff3c89-6656-4f85-b4d4-78cc09690168`
- **Production environment ID:** `ad75ce30-2283-4d92-8993-b00c9c94a6e2`

## Services
- **API server** service ID: `1903c4cf-ac10-4717-b446-b815741b135e`
  - Public domain: `api-server-production-070f.up.railway.app`
  - Start command: `node artifacts/api-server/dist/index.mjs`
  - Healthcheck: `/api/health` (timeout 60s)
- **Postgres** service ID: `69e86117-00d6-4999-b725-683c7b4f9d41`
  - Public proxy: `nozomi.proxy.rlwy.net:51541`
  - Internal host: `postgres.railway.internal:5432`
  - Database: `railway`

## Known Build Fix
**Why:** `npm install -g pnpm` does not add pnpm to PATH in the same shell session.  
**Fix:** `nixpacks.toml` uses `$(npm config get prefix)/bin/pnpm install --frozen-lockfile` instead of just `pnpm install`.  
**How to apply:** If Railway build fails with `pnpm: command not found`, check nixpacks.toml is using the absolute path form.

## Vercel
- **Project:** `jumia-ng-store` (ID: `prj_jJ4Z72KUsNSBa5uyjRKSBrcFy472`)
- **Production domain:** `bigdealsnigeria.shop`
- **Output directory:** `artifacts/store/dist/public`
- **VITE_API_BASE_URL:** `https://api-server-production-070f.up.railway.app`

## Database
- 33 products seeded; schema tables `products`, `orders`, `order_items` exist on Railway Postgres.
- To re-seed: `DATABASE_URL="postgresql://postgres:...@nozomi.proxy.rlwy.net:51541/railway" pnpm --filter @workspace/db run seed`
- drizzle-kit `push` fails on Railway because of `pg_stat_statements` extension. Use direct `psql` CREATE TABLE IF NOT EXISTS instead.
