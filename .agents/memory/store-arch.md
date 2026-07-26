---
name: Online Store architecture
description: Key design decisions, route conventions, and known quirks for the BigDeals Nigeria store
---

## Stack
- Frontend: React + Vite (port from `$PORT`), served at `/store/` base path
- Backend: Express API server (port 8080), mounted at `/api/`
- DB: PostgreSQL via Drizzle ORM (`@workspace/db`)
- Payments: Paystack (redirect flow, not embedded)

## Product database
- 33 products across 10 categories
- IDs: 15–18 (Home & Office), 33–61 (all other categories)
- IDs are non-sequential due to multiple seed runs; never assume sequential IDs
- `drizzle-kit push` removed the stale `brand` column on 2026-07-26

## Categories (all 10 — must be in BOTH Catalog.tsx and layout.tsx)
Electronics, Phones & Tablets, Home & Office, Fashion, Computing, Supermarket, Kitchen & Dining, Health & Beauty, Sporting Goods, Baby Products

## Discounts / ratings (jumia-mock.ts)
Use deterministic hash functions — NOT a lookup table by ID. IDs are sparse and non-sequential, so hardcoded ID maps always miss most products. Current implementation: `((id * 2654435761) >>> 0) % 40 + 30` for discount %.

## Cart persistence
Cart state is persisted to localStorage under key `bigdeals_cart_v1`. Max quantity per line item: 10.

## Image proxy
All product images go through `/api/image-proxy?url=<encoded>`. The allowlist is in `artifacts/api-server/src/routes/imageProxy.ts`. Only add hosts you've verified return 200 through the proxy.

## Known browser console 404
Every page shows one "Failed to load resource: 404" in browser console. This comes from a Replit dev plugin (cartographer or dev-banner), not app code. Non-critical — does not affect users.

## DB schema drift pattern
If `drizzle-kit push` needs user confirmation (e.g., dropping a column), use `--force` flag or pipe `yes` — the TTY check blocks in CI/shell. Command: `echo "yes" | pnpm --filter @workspace/db exec drizzle-kit push --force`
