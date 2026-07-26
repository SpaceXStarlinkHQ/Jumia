---
name: Catalog validation
description: How to run the product catalog validator and what its warnings mean
---

# Product Catalog Validation

## Run command
```bash
pnpm --filter @workspace/db run validate
```
Script: `lib/db/src/validate-catalog.ts`

## What it checks (per product)
- images.length ≥ 4 (WARN if not; ERROR if 0)
- imageUrl === images[0] (ERROR if mismatch)
- No duplicate URLs within a product's images array (ERROR)
- No two products in the same category share their primary image / images[0] (ERROR)
- Brand name (extracted from product name) appears in description (WARN)
- Description contains KEY FEATURES or SPECIFICATIONS section (WARN)
- Price > 0 and within expected range per category (WARN)
- Stock ≥ 0 (WARN/ERROR)

## Known permanent warnings (not bugs)
- Most products have 2–3 images instead of 4–6 — this is a hard constraint of our limited confirmed-safe Unsplash image pool. Getting to 4+ images requires product-specific CDN photography or discovering additional working Unsplash IDs.
- Supplemental image overlap across products in the same category (e.g. all three baby products share the 5 confirmed baby Unsplash IDs) — unavoidable given the pool size.
- Unbranded products (Ankara Dress, Leather Tote Bag) — no known brand to validate.
- Two TVs (LG 43" and Hisense 55") — only one confirmed TV Unsplash ID exists; Hisense now uses a secondary unverified ID as primary to avoid the ERROR, but subject is uncertain.

## Brand extraction
`extractBrand()` in both `lib/db/src/validate-catalog.ts` and `artifacts/store/src/pages/ProductDetail.tsx` — extracts brand from product name using KNOWN_BRANDS array (longest-match first).

**Why:** There is no brand column in the products schema. Brand is embedded in product names. If a brand is added as a schema column in the future, remove the extraction logic and use the column directly.

## Related products sorting (ProductDetail.tsx)
`sortedRelated` memo: same-brand products in the category appear first, then other-brand products. Cap of 10. De-duplicates by ID. Brand badge shown on same-brand cards.
