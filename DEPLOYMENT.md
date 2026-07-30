# Deployment Guide

## Architecture

| Service | Platform | Purpose |
|---------|----------|---------|
| API Server | Railway | Express backend + PostgreSQL |
| Storefront | Vercel | React/Vite frontend |

---

## Step 1 — Deploy the API to Railway

### 1a. Create the project

1. Go to [railway.app](https://railway.app) → **New Project**
2. Choose **Deploy from GitHub repo** → select this repository
3. Railway auto-detects `railway.toml` at the root — the build and start commands are already configured

### 1b. Add a PostgreSQL database

In your Railway project, click **+ Add Service → Database → PostgreSQL**.  
Railway automatically sets `DATABASE_URL` as an environment variable on your API service — you don't need to copy it manually.

### 1c. Set environment variables

In the API service's **Variables** tab, add:

| Variable | Value |
|----------|-------|
| `PORT` | `8080` |
| `PAYSTACK_SECRET_KEY` | Your Paystack secret key (starts with `sk_live_…`) |
| `SESSION_SECRET` | Any long random string |
| `FRONTEND_URL` | *(leave blank for now — fill in after Vercel deployment)* |

### 1d. Deploy & note your URL

Click **Deploy**. Once the health check at `/api/products` passes, Railway will show your public URL, e.g.:

```
https://jumia-api-production.up.railway.app
```

Keep this URL handy — you'll need it in Step 2.

### 1e. Run database migrations + seed

In the Railway service shell (or locally with `DATABASE_URL` set to the Railway Postgres URL):

```bash
# Push the schema
pnpm --filter @workspace/db run push

# Seed the 6 base products (optional — the DB already has 20 products in the Replit DB)
pnpm --filter @workspace/db run seed
```

> **Note:** The other 14 products were inserted directly into the Replit PostgreSQL database via SQL.  
> To migrate all 20 products, run the SQL from `lib/db/src/seed-all-products.sql` (you can export it from the Replit DB).

---

## Step 2 — Deploy the Storefront to Vercel

### 2a. Import the project

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import this GitHub repository
3. Vercel will detect `vercel.json` — the build command and output directory are pre-configured
4. Set **Root Directory** to `.` (the repo root)
5. Set **Framework Preset** to **Other**

### 2b. Set environment variables

In the Vercel project settings, add these **environment variables** before the first deploy:

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | Your Railway API URL (e.g. `https://jumia-api-production.up.railway.app`) |
| `BASE_PATH` | `/` |

> `BASE_PATH=/` tells Vite to serve the app at the root path (not `/store/` as in Replit dev).

### 2c. Deploy

Click **Deploy**. Once done, Vercel gives you your storefront URL, e.g.:

```
https://jumia-ng.vercel.app
```

---

## Step 3 — Wire them together

### 3a. Tell the API about the Vercel frontend (CORS)

Back in Railway → API service → Variables, set:

```
FRONTEND_URL = https://jumia-ng.vercel.app
```

Trigger a **redeploy** on Railway.

### 3b. Verify Paystack callback URL

In your [Paystack dashboard](https://dashboard.paystack.com) → Settings → API Keys & Webhooks:

- **Callback URL:** `https://jumia-ng.vercel.app/orders/{reference}` — Paystack appends `?reference=…` automatically, so set it to `https://jumia-ng.vercel.app`
- **Webhook URL:** `https://jumia-api-production.up.railway.app/api/checkout/webhook`

---

## Environment variable summary

### Railway (API)

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | ✅ | Auto-set by Railway PostgreSQL plugin |
| `PORT` | ✅ | Set to `8080` |
| `PAYSTACK_SECRET_KEY` | ✅ | From Paystack dashboard |
| `SESSION_SECRET` | ✅ | Any random string ≥ 32 chars |
| `FRONTEND_URL` | ✅ | Your Vercel domain |

### Vercel (Storefront)

| Variable | Required | Notes |
|----------|----------|-------|
| `VITE_API_BASE_URL` | ✅ | Your Railway API URL |
| `BASE_PATH` | ✅ | Must be `/` |

---

## Continuous deployment

Both platforms redeploy automatically on every push to the default branch once connected to GitHub. No further configuration needed.
