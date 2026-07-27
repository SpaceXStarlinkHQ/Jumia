---
name: Railway deployment
description: Railway deployment health-check requirements and database provisioning constraint for the store API
---

Railway project `thriving-flow` runs the `Jumia` API service with `/api/products` as its health check. The service can start and pass `/api/health`, but deployment fails when the configured database has no `products` table; Railway has no PostgreSQL service attached in this project, so the database must be provisioned and initialized before redeploying.

**Why:** A health check that exercises application data catches missing schema early, but it also makes an uninitialized external database look like an application startup failure.

**How to apply:** When redeploying this API on Railway, attach/provide a PostgreSQL database, run the Drizzle schema push and seed against that database, then redeploy. Keep the health check only after `/api/products` returns successfully.