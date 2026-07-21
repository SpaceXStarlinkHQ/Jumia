# Online Store

A full-stack e-commerce store with Paystack payments, product catalog, cart, checkout, and an admin dashboard.

## Run & Operate

- **API server** (port 8080): `PORT=8080 pnpm --filter @workspace/api-server run dev`
- **Store frontend** (port 24964): `PORT=24964 BASE_PATH=/store/ pnpm --filter @workspace/store run dev`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/db run seed` — seed the database with the 6 promo products (clears existing rows first)

## Required Environment Variables / Secrets

- `DATABASE_URL` — Postgres connection string (provision a Replit PostgreSQL database)
- `SESSION_SECRET` — secret for session signing
- `PAYSTACK_SECRET_KEY` — Paystack secret key for payment processing

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- **API:** Express 5 (`artifacts/api-server`)
- **Frontend:** React 19 + Vite 7 + Tailwind CSS 4 (`artifacts/store`)
- **DB:** PostgreSQL + Drizzle ORM; schema in `lib/db/src/schema/`
- **Payments:** Paystack (native fetch)
- **Validation:** Zod (`zod/v4`), `drizzle-zod`
- **API codegen:** Orval (OpenAPI spec → `lib/api-client-react` + `lib/api-zod`)

## Where things live

- `artifacts/api-server/src/` — Express routes and middleware
- `artifacts/store/src/pages/` — Catalog, ProductDetail, Cart, Checkout, OrderConfirmation, Dashboard
- `lib/db/src/schema/` — Drizzle table definitions (products, orders, order_items)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/` — generated React Query hooks (do not edit by hand)
- `lib/api-zod/` — generated Zod schemas (do not edit by hand)

## Architecture decisions

- All monetary amounts stored in kobo (smallest Naira unit); frontend divides by 100 to display ₦
- Paystack checkout uses full-page redirect (not popup): frontend → `initiateCheckout` → redirect to Paystack → redirect back to `/orders/:reference` → `verifyPayment`
- OpenAPI codegen: never use `format: email` (Orval emits invalid Zod v4); never name a schema `<OperationIdPascal>Body` (name collision)
- API server PORT must be inlined in the workflow command (`PORT=8080 …`) — the managed workflow doesn't auto-inject it

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any change to `openapi.yaml`
- Run `pnpm --filter @workspace/db run push` after schema changes (dev only; coordinate carefully in prod)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
