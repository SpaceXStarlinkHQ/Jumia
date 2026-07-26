---
name: Unsplash image IDs for seed data
description: Confirmed-working Unsplash photo IDs used in lib/db/src/seed.ts product images
---

# Unsplash Photo IDs — Confirmed Working

All URLs follow: `https://images.unsplash.com/photo-{ID}?w=500&q=80`
Tested via the image proxy at `GET /api/image-proxy?url=<encoded>` — must return 200.

**Rule:** Never guess Unsplash IDs. Only use IDs from this confirmed list, or test before committing. Always visually verify what the image shows before assigning it.

## Confirmed-Working IDs (as of 2026-07-26)

### Appliances / Home
- `1626806819282-2c1dc01a5e0c` — washing machine (front-load, white)
- `1631049307264-da0ec9d70304` — hotel bedroom with white bed (mattress)
- `1505693416388-ac5ce068fe85` — elegant upholstered bedroom (mattress)
- `1571175443880-49e1d25b2bc5` — refrigerator
- `1586201375761-83865001e31c` — white rice/grain granules (use for sugar/bulk grain)

### Electronics
- `1593784991095-a205069470b6` — Samsung Smart TV showing home screen interface (large TV)
- `1608043152269-423dbba4e7e1` — bluetooth speaker on table

### Phones / Tablets
- `1598327105666-5b89351aff97` — smartphone (angled, dark)
- `1592750475338-74b7b21085ab` — smartphone
- `1567581935884-3349723552ca` — smartphone on table
- `1574944985070-8f3ebc6b79d2` — smartphone (white background)

### Laptops / Computing
- `1496181133206-80ce9b88a853` — laptop open (side angle)
- `1517336714731-489689fd1ca8` — laptop side view
- `1541807084-5c52b6b3adef` — laptop on desk
- `1555255707-c07966088b7b` — laptop flat
- `1517430816045-df4b7de11d1d` — laptop

### Fashion
- `1583743814966-8936f5b7be1a` — polo/shirt on display
- `1589302168068-964664d93dc0` — African fashion/dress
- `1584917865442-de89df76afd3` — red/coral structured leather handbag (Ferragamo style)

### Food / Supermarket
- `1544787219-7f47ccb76574` — beverage/drink tin
- `1542990253-a781e04c0082` — cocoa/chocolate drink
- `1612929633738-8fe44f7ec841` — noodles in bowl
- `1569718212165-3a8278d5f624` — noodle dish
- `1586201375761-83865001e31c` — white rice/grain granules

### Kitchen
- `1556911220-e15b29be8c8f` — woman stirring on gas stove (gas cooker in use)
- `1590794056226-79ef3a8147e1` — orange cast iron pot on stovetop (cookware)
- `1570222094114-d054a817e56b` — coffee grinder + coffee maker on kitchen counter (kitchen appliances)

### Health & Beauty
- `1556228578-8c89e6adf883` — skincare product
- `1512290923902-8a9f81dc236c` — beauty/cream
- `1540555700478-4be289fbecef` — skincare bottle
- `1522337360788-8b13dee7a37e` — hair care product
- `1535585209827-a15fcdbc4c2d` — hair product
- `1631729371254-42c2892f0e6e` — personal care device (epilator style)

### Sports / Fitness
- `1534438327276-14e5300c3a48` — dumbbells/weights
- `1571019613454-1cb2f99b2d8b` — gym fitness

### Baby
- `1566004100631-35d015d6a491` — baby/diapers
- `1519689680058-324335c77eba` — baby items
- `1515488042361-ee00e0ddd4e4` — baby stroller

## Logitech CDN (resource.logitech.com)
URLs must NOT include the `d_transparent.gif` fallback segment. Use this format:
`https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/content/dam/logitech/en/products/mice/mx-master-3s/gallery/<filename>.png`
The `d_transparent.gif` segment causes the CDN to return a blank transparent gif instead of the product image.

## Generator images (Firman CDN — confirmed 200 through proxy)
- `https://firmanpowerequipment.com/cdn/shop/products/W03082_200_900x900.png` — front view
- `https://firmanpowerequipment.com/cdn/shop/files/W03082_Hover_900x900.jpg` — angle view
- `https://firmanpowerequipment.com/cdn/shop/files/W03082_Included_900x900.jpg` — in-box view

## Nike CDN (static.nike.com) — test results as of 2026-07-26
- AF1 top `b7d9211c-...` → 200 ✓ (in use for Nike AF1 primary)
- AF1 side `3fefc6c5-...` → 404 ✗ (removed from seed)
- AF1 sole `772da609-...` → 404 ✗ (removed from seed)
- Phantom GX `3cb66f21-...` → 404 ✗ (removed; football boots falls back to Unsplash)
**Warning:** Nike CDN image UUIDs can go stale without notice. Always verify before adding.

## Image Proxy Allowlist (working external hosts)
- `images.unsplash.com` ✅
- `www.danby.com` ✅
- `www.koolatron.com` ✅
- `techmall-images-repo.s3.eu-west-2.amazonaws.com` ✅
- `static.nike.com` ✅
- `store.storeimages.cdn-apple.com` ✅
- `resource.logitech.com` ✅
- `firmanpowerequipment.com` ✅ (CDN shop URLs work: /cdn/shop/products/ and /cdn/shop/files/)
- `clorebeauty.com` ❌ not in allowlist (403)

## Additional Confirmed 200 (subject unverified — use cautiously)
- `1504450758481-7338eba7524a` → 200 (used as Hisense TV secondary primary — unknown subject)
- `1590602847861-f357a9332bbc` → 200 (unknown subject)
- `1556742049-0cfed4f6a45d` → 200 (unknown subject)
- `1571019614242-c5c5dee9f50b` → 200 (likely gym/fitness adjacent — near 1571019613454)
- `1604671368394-2240d0b1bb6c` → 200 (unknown subject)
- `1542291026-7eec264c27ff` → 200 (likely sneaker/shoe lifestyle — used for Nike AF1 supplemental)
- `1491553895911-0055eca6402d` → 200 (likely shoe detail — used for Nike AF1 / football boots supplemental)
- `1597350584914-55bb62285896` → 200 (unknown subject)
- `1611532736597-de2d4265fba3` → 200 (unknown subject)
- `1543163521-1bf539c55dd2` → 200 (unknown subject)
- `1503376780353-7e6692767b70` → 200 (unknown subject)

## Broken / Do Not Use
These IDs returned 404 from Unsplash:
`1610557892470-55d9ea80c8db`, `1590041105897-c3b7f07e9ed7`, `1581093458791-9f3c3900df4b`,
`1567690187548-f07b1d7bf754`, `1593359677879-a4bb92f4834a`, `1565775823826-4c7bfdb77c68`,
`1546241183-3fb70e0b0c73`, `1616348436043-9c5c6a0e39c7`, `1512941937938-a272e621e498`,
`1484788984921-03950022c38b`, `1623112383589-8d51b5c24f08`, `1590736969596-91d9f3d1e671`,
`1574781921544-5befe33ff3ba`, `1606914430810-e96c1eb8e900`, `1585032226651-757a9a1d4642`,
`1543353071-087b4f1e2bc2`, `1522337659624-216be656407b`, `1590556360974-ce10e00e7bbd`,
`1561087867-b62e82c5d6e4`, `1562016600-ece076df3a6e`,
`1614812514603-84193dd929c4`, `1548545774-45f85dc47ce5`, `1525351484163-7529414f2adb`,
`1556910096-6f5e72db7803`

## Wrong Subject (returns 200 but shows wrong thing)
- `1504893524553-b855bce32c67` — Icelandic canyon/fjord landscape ❌ (was used as washing machine image 3)
- `1558618666-fcd25c85cd64` — coffee roaster / barista close-up ❌
- `1530124566582-a618bc2615dc` — rack of hand tools (pliers, scissors) ❌
- `1560472354-b33ff0c44a43` — Google Search Console analytics dashboard screenshot ❌
- `1568702846914-96b305d2aaeb` — red apple on white background ❌
- `1546868871-7041f2a55e12` — smartwatch on wrist ❌ (mislabeled as "wall-mounted TV")
- `1571415060716-baff5f717c37` — vintage/CRT TV ❌ (mislabeled as "TV screen")

## WRONG LABELS (old memory had these wrong — DO NOT USE for these purposes)
- `1570197788417-0e82375c9371` — actually shows ICE CREAM (was labeled "blender") ❌
- `1550583724-b2692b85b150` — actually shows MILK BEING POURED (was labeled "sugar") ❌
- `1555041469-a586c61ea9bc` — actually shows GREEN SOFA (was labeled "mattress") ❌
- `1556909114-f6e7ad7d3136` — actually shows COUPLE COOKING (was labeled "gas stove") ❌
- `1548036328-c9fa89d128fa` — actually shows BLACK GUCCI CROSSBODY BAG (was labeled "handbag" — wrong style) ❌
- `1556909172-54557c7e4fb7` — actually shows KITCHEN INTERIOR (was labeled "cookware pots") ❌
- `1498837167922-ddd27525d352` — actually shows COLOURFUL SALAD BAR (was labeled "cookware set") ❌
- `1584568694244-14fbdf83bd30` — actually shows COMMERCIAL REFRIGERATOR DISPLAY CASE (was labeled "kitchen appliance") ❌
- `1600271886742-f049cd451bba` — actually shows ORANGE JUICE (was labeled "blender/kitchen") ❌

**Why:** Amazon, Samsung, Jumia, LG, Hisense, Etsy, Ralph Lauren all block proxy/hotlink requests or have dead URLs. Only use hosts from the confirmed working list above when adding new product images. Always visually verify Unsplash IDs before committing — labels are unreliable.
