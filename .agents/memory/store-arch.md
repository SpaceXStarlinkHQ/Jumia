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
