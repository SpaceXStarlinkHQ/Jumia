#!/bin/bash
set -e

# Install all workspace dependencies
pnpm install

# Push DB schema (create/update tables)
pnpm --filter @workspace/db run push-force

# Seed initial product data (idempotent — clears and re-inserts)
pnpm --filter @workspace/db run seed
