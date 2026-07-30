# Deployment Guide

## Live URLs

| Service | URL |
|---------|-----|
| **Storefront** | https://bigdealsnigeria.shop |
| **API Server** | https://api-server-production-070f.up.railway.app |

---

## Architecture

| Service | Platform | Purpose |
|---------|----------|---------|
| API Server | Railway (`hopeful-peace` project) | Express backend + PostgreSQL |
| Storefront | Vercel (`jumia-ng-store` project) | React/Vite frontend |

### Railway IDs
- Project: `daff3c89-6656-4f85-b4d4-78cc09690168`
- Environment: `production` (`ad75ce30-2283-4d92-8993-b00c9c94a6e2`)
- API service: `1903c4cf-ac10-4717-b446-b815741b135e`
- Postgres service: `69e86117-00d6-4999-b725-683c7b4f9d41`

---

## Environment Variables

### Railway — API Server

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (Railway reference variable) |
| `PORT` | `8080` |
| `PAYSTACK_SECRET_KEY` | *(set — starts with `sk_live_…`)* |
| `SESSION_SECRET` | *(set — 88-char random string)* |
| `FRONTEND_URL` | `https://bigdealsnigeria.shop` |
| `NODE_ENV` | `production` |

### Vercel — Storefront

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | `https://api-server-production-070f.up.railway.app` |
| `BASE_PATH` | `/` |

---

## Paystack Webhook Configuration

In [Paystack dashboard](https://dashboard.paystack.com) → Settings → API Keys & Webhooks:

| Field | Value |
|-------|-------|
| **Callback URL** | `https://bigdealsnigeria.shop` |
| **Webhook URL** | `https://api-server-production-070f.up.railway.app/api/checkout/webhook` |

---

## Continuous Deployment

Both platforms redeploy automatically on every push to the `main` branch.

- **Railway**: triggered by GitHub push → builds with Nixpacks → starts `node artifacts/api-server/dist/index.mjs`
- **Vercel**: triggered by GitHub push → runs `pnpm --filter @workspace/store run build` → serves from `artifacts/store/dist/public`

---

## Database

Railway PostgreSQL (production):
- Public URL: `nozomi.proxy.rlwy.net:51541`
- Database: `railway`
- Tables: `products` (33 seeded), `orders`, `order_items`

To re-seed from local with Railway DB:
```bash
DATABASE_URL="postgresql://postgres:...@nozomi.proxy.rlwy.net:51541/railway" pnpm --filter @workspace/db run seed
```

---

## Troubleshooting

### Railway build fails with `pnpm: command not found`
`nixpacks.toml` uses `$(npm config get prefix)/bin/pnpm` to reference the correct path after global install. If this recurs, check the Railway build logs for the actual npm global prefix.

### Vercel output directory error
The build output goes to `artifacts/store/dist/public`. Vercel project setting **Output Directory** must be `artifacts/store/dist/public` — `vercel.json` already sets this.

### API healthcheck failing on Railway
Health endpoint is at `/api/health` (returns `{"status":"ok"}`). Healthcheck timeout is 60 s. If it fails, check that `DATABASE_URL`, `PAYSTACK_SECRET_KEY`, `SESSION_SECRET`, and `PORT` are all set in Railway variables.
