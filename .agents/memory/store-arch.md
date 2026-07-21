---
name: Store architecture
description: Online store with Paystack payments — key decisions, gotchas, and conventions
---

## Stack
- Express 5 API server (`artifacts/api-server`), React+Vite frontend (`artifacts/store`)
- PostgreSQL + Drizzle ORM; schema in `lib/db/src/schema/`
- Paystack payments via native `fetch` (Node 24 — no extra HTTP client needed)
- Codegen: `pnpm --filter @workspace/api-spec run codegen` → `lib/api-client-react` + `lib/api-zod`

## Paystack integration
- Secret stored as `PAYSTACK_API_KEY` Replit Secret (runtime-managed — do NOT set manually)
- Initialize: POST `https://api.paystack.co/transaction/initialize` with `{ email, amount (kobo), reference, callback_url }`
- Verify: GET `https://api.paystack.co/transaction/verify/:reference`
- Webhook: POST `/api/checkout/webhook` — HMAC SHA512 signature check with `PAYSTACK_SECRET_KEY`
- Checkout flow: frontend calls `initiateCheckout` → gets `paystackUrl` → `window.location.href = paystackUrl` (full redirect) → Paystack redirects back to `/orders?reference=xxx` → `PaystackReturn` component reads query param and redirects to `/orders/:reference` → page calls `verifyPayment`

## Paystack callback URL fix (important)
- Paystack appends `?reference=xxx&trxref=xxx` as query params to the callbackUrl, NOT as a path segment.
- The callbackUrl must be `${baseUrl}/orders` (no trailing slash, no reference placeholder).
- `App.tsx` has a `<Route path="/orders" component={PaystackReturn} />` that reads `?reference` from query string and redirects to `/orders/:reference`.
- The `<Route path="/orders/:reference">` must come AFTER `/orders` in the Switch so it doesn't shadow the landing route.

## Currency
All amounts stored and transmitted in kobo (smallest Naira unit). Frontend divides by 100 and shows ₦.

## Promo / discount
- `jumia-mock.ts` returns 80% discount for all products.
- `getOriginalPrice(priceKobo) = priceKobo / 0.2` (5× the stored price) — the stored `priceKobo` IS the discounted price.
- Flash sale timer counts down to `2026-07-23T23:59:59Z` (2-day promo end).

## Seeding
- Seed script: `lib/db/src/seed.ts` — deletes all products, then inserts 6 items.
- Run: `pnpm --filter @workspace/db run seed`
- Products: Electric Bike, Smartphone, Smart TV, Deep Freezer, Solar System, Washing Machine.
- tsx must be a devDependency of `@workspace/db` for the seed script to run.

## OpenAPI / codegen gotcha
- Never use `format: email` in openapi.yaml — Orval emits `zod.email()` which is invalid in Zod v4. Use plain `type: string`.
- Never name a component schema `<OperationIdPascal>Body` — collides with Orval's auto-derived Zod name and breaks `typecheck:libs`.

## API server workflow
- Workflow command: `PORT=8080 pnpm --filter @workspace/api-server run dev` (PORT must be inlined — managed workflow doesn't inject it via configureWorkflow path)

**Why:** The artifact was imported from GitHub, so no managed workflow existed. Configuring it via `configureWorkflow` (not the artifact tool) means the platform doesn't auto-inject `PORT`/`BASE_PATH`.
