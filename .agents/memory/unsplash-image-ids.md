---
name: Unsplash image IDs
description: Confirmed-working Unsplash photo IDs for seed.ts; includes full assignment map and known-broken IDs
---

# Unsplash image IDs for BigDeals Nigeria

## How IDs are tested
All IDs are verified through the image proxy at `/api/image-proxy?url=<encoded>`.
An ID is "confirmed" only when the proxy returns HTTP 200 AND the downloaded image
matches its labeled subject.

## Current state (as of 2026-07-30)
All 33 products have 4 images each (except Morning Glory Mattress which has 3).
The `IMG` constants object in `lib/db/src/seed.ts` maps named keys → confirmed IDs.
After this session's fixes: 0 validation errors, ~32 cross-product sharing warns (acceptable).

## IDs confirmed WRONG — never use these as product images

| Unsplash ID | Actually shows | Was mislabeled as |
|---|---|---|
| `1584568694244-14fbdf83bd30` | Commercial glass-door supermarket fridge | fridge door / product fridge |
| `1555041469-a586c61ea9bc` | Green fabric sofa | mattress / bedroom suite |
| `1519689373023-dd07c7988603` | Young man in camo hoodie (streetwear portrait) | baby portrait / close-up |
| `1516733725897-1aa73b87c8e8` | Parent and child on beach (adult-facing lifestyle) | baby lifestyle — NOTE: may be borderline acceptable for baby products; review before removing |
| `1499638673689-79a0b5115d87` | Iced tea / cocktail glasses | chocolate/malt drink |
| `1571415060716-baff5f717c37` | Vintage CRT television | modern TV |
| `1570197788417-0e82375c9371` | Ice cream scoop in cone | blender / kitchen |
| `1600271886742-f049cd451bba` | Glass of orange juice | blender output / kitchen |
| `1498837167922-ddd27525d352` | Colourful salad bar spread | cookware set |
| `1565299624946-b28f40a0ae38` | Pizza on wooden board | noodles / food |
| `1622015663319-e97e697503ee` | Luxury white villa with cacti | fashion / dress lifestyle |
| `1550583724-b2692b85b150` | Milk being poured into glass | sugar / granulated food |
| `1548036328-c9fa89d128fa` | Black structured crossbody bag (Gucci-style) | leather tote bag (still usable as bag secondary, but wrong product type) |
| `1556909114-f6e7ad7d3136` | Couple cooking at gas stove | ✅ Actually CORRECT for gas cooker/kitchen — was mislabeled wrong in old memory |
| `1556909172-54557c7e4fb7` | Kitchen interior | ✅ Actually CORRECT for cookware/kitchen context — was mislabeled wrong in old memory |

## Brand CDN partial failures (only some angles work)
- **Apple CDN** — `_AV3_FMT_WHH` and `_AV4_FMT_WHH` both return 404. Only `_FMT_WHH` and `_AV2_FMT_WHH` live.
- **Logitech CDN** — bottom-view URL (`bottom-view-graphite`) returns 404. Top, side, front confirmed working.
- **Nike static CDN** — Only the top-view UUID (`b7d9211c-...`) is live for AF1 CW2288-111. All other color/angle UUIDs return 404.

## Brand CDN hosts that fail proxy entirely
- `lg.com` → HTTP 415 (unsupported media type from proxy)
- `hisense.com.ng` → HTTP 504 (timeout)
- `hp.com` product images → 403/404
- `samsung.com` product images → 403
- `philips.com` product images → 403
- `neutrogena.com` product images → 403

## Allowed image proxy hosts (confirmed in imageProxy.ts allowlist)
- `images.unsplash.com`
- `firmanpowerequipment.com`
- `www.danby.com`
- `store.storeimages.cdn-apple.com`
- `resource.logitech.com`
- `static.nike.com`
- `techmall-images-repo.s3.eu-west-2.amazonaws.com`
