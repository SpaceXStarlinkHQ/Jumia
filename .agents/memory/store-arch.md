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

## Required secrets
- `PAYSTACK_SECRET_KEY` — used in `artifacts/api-server/src/routes/checkout.ts` as `process.env.PAYSTACK_SECRET_KEY`
  - NOTE: the env var in the code was changed from `PAYSTACK_API_KEY` to `PAYSTACK_SECRET_KEY` to match the secret name

## Products schema
- `images TEXT[]` column stores up to 3 product image URLs for the detail page gallery
- `image_url TEXT` kept for backward compat (= images[0])
- Frontend uses `product.images?.[0] || product.imageUrl` in Catalog cards
- ProductDetail.tsx has full gallery: main image + thumbnail row, `selectedImageIdx` state

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
