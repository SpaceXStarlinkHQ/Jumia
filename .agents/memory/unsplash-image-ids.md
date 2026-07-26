---
name: Unsplash image IDs and blocked CDN notes
description: Confirmed-working Unsplash photo IDs used in seed.ts, plus CDN allowlist status and known-broken URLs
---

## Confirmed Unsplash IDs (visually verified)
All IDs listed in seed.ts under the `IMG` constant are confirmed working. See seed.ts lines 35–102 for the full list with descriptions.

## Working CDN hosts (in image proxy allowlist)
- `images.unsplash.com` — primary image source ✓
- `firmanpowerequipment.com` — Firman generator 3-angle gallery ✓
- `www.danby.com` — Danby chest freezer front view ✓
- `techmall-images-repo.s3.eu-west-2.amazonaws.com` — LG refrigerator ✓
- `store.storeimages.cdn-apple.com` — Apple iPad (partial, see below)
- `resource.logitech.com` — Logitech MX Master 3S (partial, see below)
- `static.nike.com` — Nike AF1 top view only (partial, see below)

## Known broken URLs (confirmed 404 on 2026-07-26)
- Apple iPad AV3 and AV4 gallery variants (`_AV3_FMT_WHH`, `_AV4_FMT_WHH`) → 404
  - Only `_FMT_WHH` (hero) and `_AV2_FMT_WHH` are live
- Logitech MX Master 3S bottom view → 404
  - Keep: top, side, front
- Nike CDN: only `b7d9211c` UUID is live for AF1 White. Side/sole UUIDs return 404.
- Nike Phantom GX main UUID `3cb66f21` → 404

## Completely blocked CDN hosts (from Replit environment)
- `images.jumia.com.ng` → connection refused (000)
- `ng.jumia.is` → 404 (blocked)
- Do NOT use any Jumia CDN URLs in seed data

## Validator summary (as of 2026-07-26)
- 0 errors, 54 warnings (all shared supplemental images — acceptable)
- 8 products fully passing (no shared images at all)
- Run: `pnpm --filter @workspace/db run validate`
