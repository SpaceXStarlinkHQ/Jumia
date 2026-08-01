---
name: Railway deployment
description: Railway deployment health-check requirements, database provisioning, and deploy trigger method
---

Railway project `thriving-flow` runs the `Jumia` API service with `/api/products` as its health check path (`railway.toml`). Deployments fail when the connected database has no `products` table because the health check returns 500.

**Root cause pattern:** A health check that exercises application data catches missing schema early, but also makes an uninitialized external database look like an application startup failure.

**How to apply:** Before redeploying, run the Drizzle schema push and seed against the Railway-side database (from the Railway shell: `pnpm --filter @workspace/db run push && pnpm --filter @workspace/db run seed`), then trigger a redeploy.

**Railway token scope:** The RAILWAY_TOKEN in Replit secrets returns "Not Authorized" for all GraphQL mutations and even basic `me`/`projects` queries. It cannot be used to programmatically trigger redeployes or read deployment status. Use GitHub push to trigger auto-deploy instead.

**Triggering Railway auto-deploy from Replit:** Use `git commit --allow-empty -m "chore: trigger redeploy" && git push origin main`. Railway is connected to `SpaceXStarlinkHQ/Jumia` on the `main` branch and deploys on every push. GitHub credentials use the `GITHUB_PERSONAL_TOKEN` secret configured as the git credential helper.
