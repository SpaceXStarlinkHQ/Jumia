---
name: Unsplash image IDs
description: Confirmed-working Unsplash photo IDs for seed.ts; includes full assignment map and known-broken IDs
---

# Unsplash image IDs for BigDeals Nigeria

## How IDs are tested
All IDs are verified through the image proxy at `/api/image-proxy?url=<encoded>`.
An ID is "confirmed" only when the proxy returns HTTP 200.

## Confirmed working IDs (full list in seed.ts IMG object)

All IDs in `lib/db/src/seed.ts` have been proxy-verified and are confirmed live as of 2026-07-26.
Categories covered: appliances, electronics, phones, laptops, fashion, food, kitchen, health/beauty, sports, baby products.

## Confirmed broken / do not use

### Brand CDN partial failures (only some angles work)
- **Apple CDN** — `_AV3_FMT_WHH` and `_AV4_FMT_WHH` both return 404. Only `_FMT_WHH` and `_AV2_FMT_WHH` live.
- **Logitech CDN** — bottom-view URL (`bottom-view-graphite`) returns 404. Top, side, front confirmed working.
- **Nike static CDN** — Only the top-view UUID (`b7d9211c-...`) is live for AF1 CW2288-111. All other color/angle UUIDs return 404.

### Brand CDN hosts that fail proxy entirely
- `lg.com` → HTTP 415 (unsupported media type from proxy)
- `hisense.com.ng` → HTTP 504 (timeout)
- `hp.com` product images → 403/404
- `samsung.com` product images → 403
- `philips.com` product images → 403
- `neutrogena.com` product images → 403

## Image assignment per product (post-2026-07-26 seed)

All 33 products now have 4 images each except Morning Glory Mattress (3 images — no 4th mattress Unsplash ID confirmed without risk).

### Final validation state
- Products scanned: 33
- Fully passing: 29
- Warnings: 32 (all cross-product supplemental sharing — acceptable)
- Errors: 0

### Cross-product sharing that generates warns (all acceptable)
- Kitchen products (Scanfrost/Cookware/Binatone) share cooking context images (stove, pot, kitchen, pot2, kitchen3)
- Supermarket products (Sugar/Milo) share cocoa, choc_drink (thematically related food products)
- Baby products share baby3, baby_life across Pampers/Fisher-Price/Stroller
- Health products: ORS and Philips share hair4 (hair care context appropriate for both)

## Allowed image proxy hosts (confirmed in imageProxy.ts allowlist)
- `images.unsplash.com`
- `firmanpowerequipment.com`
- `www.danby.com`
- `store.storeimages.cdn-apple.com`
- `resource.logitech.com`
- `static.nike.com`
- `techmall-images-repo.s3.eu-west-2.amazonaws.com`
