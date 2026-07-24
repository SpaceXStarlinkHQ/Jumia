---
name: Unsplash image IDs for seed data
description: Confirmed-working Unsplash photo IDs used in lib/db/src/seed.ts product images
---

# Unsplash Photo IDs — Confirmed Working

All URLs follow: `https://images.unsplash.com/photo-{ID}?w=500&q=80`
Tested via the image proxy at `GET /api/image-proxy?url=<encoded>` — must return 200.

**Rule:** Never guess Unsplash IDs. Only use IDs from this confirmed list, or test before committing.

## Confirmed-Working IDs (as of 2026-07-24)

### Appliances / Home
- `1626806819282-2c1dc01a5e0c` — washing machine
- ~~`1558618666-fcd25c85cd64`~~ — DO NOT USE for generators: shows a mechanic/person, not a generator
- `1555041469-a586c61ea9bc` — mattress/bed
- `1631049307264-da0ec9d70304` — mattress
- `1505693416388-ac5ce068fe85` — bedroom
- `1571175443880-49e1d25b2bc5` — refrigerator
- `1584568694244-14fbdf83bd30` — kitchen appliance
- `1504893524553-b855bce32c67` — industrial/nature

### Electronics
- `1593784991095-a205069470b6` — TV/large screen
- `1546868871-7041f2a55e12` — wall-mounted TV
- `1571415060716-baff5f717c37` — TV screen
- `1608043152269-423dbba4e7e1` — bluetooth speaker
- `1545454675-3531b543be5d` — wireless speaker

### Phones / Tablets
- `1598327105666-5b89351aff97` — smartphone
- `1592750475338-74b7b21085ab` — smartphone
- `1567581935884-3349723552ca` — smartphone on table
- `1574944985070-8f3ebc6b79d2` — smartphone
- `1581093588401-fbb62a02f120` — phone/tech

### Laptops / Computing
- `1496181133206-80ce9b88a853` — laptop open
- `1517336714731-489689fd1ca8` — laptop side view
- `1541807084-5c52b6b3adef` — laptop on desk
- `1555255707-c07966088b7b` — laptop flat
- `1517430816045-df4b7de11d1d` — laptop

### Fashion
- `1583743814966-8936f5b7be1a` — polo/shirt
- `1576566588028-4147f3842f27` — shirt folded
- `1581655353564-df123a1eb820` — fashion top
- `1589302168068-964664d93dc0` — African fashion/dress
- `1622015663319-e97e697503ee` — colourful dress
- `1548036328-c9fa89d128fa` — handbag
- `1584917865442-de89df76afd3` — handbag detail

### Food / Supermarket
- `1550583724-b2692b85b150` — sugar/white granules
- `1565299624946-b28f40a0ae38` — packaged food
- `1544787219-7f47ccb76574` — beverage tin
- `1542990253-a781e04c0082` — cocoa/chocolate drink
- `1499638673689-79a0b5115d87` — food/drink
- `1612929633738-8fe44f7ec841` — noodles
- `1569718212165-3a8278d5f624` — noodle dish

### Kitchen
- `1556909114-f6e7ad7d3136` — gas stove/cooker
- `1556909172-54557c7e4fb7` — cookware pots
- `1498837167922-ddd27525d352` — cookware set
- `1570197788417-0e82375c9371` — blender
- `1600271886742-f049cd451bba` — blender/kitchen

### Health & Beauty
- `1556228578-8c89e6adf883` — skincare product
- `1512290923902-8a9f81dc236c` — beauty/cream
- `1540555700478-4be289fbecef` — skincare bottle
- `1522337360788-8b13dee7a37e` — hair care
- `1535585209827-a15fcdbc4c2d` — hair product
- `1631729371254-42c2892f0e6e` — personal care device

### Sports / Fitness
- `1534438327276-14e5300c3a48` — dumbbells/weights
- `1571019613454-1cb2f99b2d8b` — gym fitness

### Baby
- `1566004100631-35d015d6a491` — baby/diapers
- `1519689680058-324335c77eba` — baby items
- `1519689373023-dd07c7988603` — baby
- `1515488042361-ee00e0ddd4e4` — baby stroller
- `1516733725897-1aa73b87c8e8` — children's toy

## Broken / Do Not Use
These IDs returned 404 from Unsplash:
`1610557892470-55d9ea80c8db`, `1590041105897-c3b7f07e9ed7`, `1581093458791-9f3c3900df4b`,
`1567690187548-f07b1d7bf754`, `1593359677879-a4bb92f4834a`, `1565775823826-4c7bfdb77c68`,
`1546241183-3fb70e0b0c73`, `1616348436043-9c5c6a0e39c7`, `1512941937938-a272e621e498`,
`1484788984921-03950022c38b`, `1623112383589-8d51b5c24f08`, `1590736969596-91d9f3d1e671`,
`1574781921544-5befe33ff3ba`, `1606914430810-e96c1eb8e900`, `1585032226651-757a9a1d4642`,
`1543353071-087b4f1e2bc2`, `1522337659624-216be656407b`, `1590556360974-ce10e00e7bbd`,
`1561087867-b62e82c5d6e4`, `1562016600-ece076df3a6e`

## Generator images (Firman CDN — confirmed 200 through proxy)
- `https://firmanpowerequipment.com/cdn/shop/products/W03082_200_900x900.png` — front view
- `https://firmanpowerequipment.com/cdn/shop/files/W03082_Hover_900x900.jpg` — angle view
- `https://firmanpowerequipment.com/cdn/shop/files/W03082_Included_900x900.jpg` — in-box view

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

**Why:** Amazon, Samsung, Jumia, LG, Hisense, Etsy, Ralph Lauren all block proxy/hotlink requests or have dead URLs. Only use hosts from the confirmed working list above when adding new product images.
