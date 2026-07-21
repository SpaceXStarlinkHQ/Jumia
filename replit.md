# Jumia Store Clone

A full-stack Nigerian e-commerce platform cloning the Jumia.com.ng experience. Built as a TypeScript pnpm monorepo.

## Architecture

- **Frontend**: `artifacts/store/` — React + Vite + Tailwind CSS v4 + ShadcnUI + Wouter routing, served at `/store/`
- **API Server**: `artifacts/api-server/` — Express.js v5 (ESM), served at `/api`
- **Database**: Replit PostgreSQL via Drizzle ORM (`lib/db/`)
- **API Contract**: OpenAPI 3.1 spec in `lib/api-spec/openapi.yaml`, codegen via Orval into `lib/api-client-react/` and `lib/api-zod/`
- **Payments**: Paystack integration (secret key in `PAYSTACK_SECRET_KEY`)

## Running

Both workflows are managed:
- **API Server**: `artifacts/api-server: API Server` — builds with esbuild then starts on PORT 8080
- **Online Store**: `artifacts/store: Online Store` — Vite dev server on PORT 24964

## Key Features

- Jumia-style storefront with hero banner, flash sale countdown, category browsing
- Product cards with discount badges, star ratings, "FREE Delivery" labels
- Product detail page with **3-image gallery** (clickable thumbnails, 1/N counter)
- Shopping cart, checkout flow with Paystack, order confirmation, order tracking
- 20 seeded products across 6 categories with detailed descriptions and 3 real images each

## After any API/schema change

1. Edit `lib/api-spec/openapi.yaml`
2. Run: `pnpm run --filter @workspace/api-spec codegen`
3. Restart the API Server workflow

## Database

- Tables: `products`, `orders`, `order_items`
- Products have: `name`, `description`, `price_kobo`, `image_url`, `images TEXT[]`, `stock`, `category`
- `images` stores up to 3 photo URLs shown in the product detail gallery
- To re-seed: check `scripts/` or use `executeSql` via agent

## User Preferences

- Store should look and feel like Jumia Nigeria (orange #F68B1E brand colour)
- Products must have 3 detailed photos and a thorough description
- Prices are stored in kobo (multiply naira × 100)
