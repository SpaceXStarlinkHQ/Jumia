/**
 * Seed script — populates the store with 35+ real products across all categories.
 * Run with: pnpm --filter @workspace/db run seed
 *
 * Prices are stored in kobo (₦1 = 100 kobo).
 */
import { sql } from "drizzle-orm";
import { db, productsTable } from "./index.js";

const products = [
  // ── Home & Office ────────────────────────────────────────────────────────────
  {
    name: "200L Haier Thermocool Deep Freezer — HDF-200HS",
    description: `Keep your food, drinks, and perishables frozen for longer with the Haier Thermocool 200L Deep Freezer. Built for Nigerian homes and businesses, it combines generous storage with energy efficiency and rock-solid reliability.

KEY FEATURES:
• 200-litre gross capacity — ideal for families, shops, and small businesses
• Fast-freeze function locks in freshness at -18°C
• Thick foam insulation retains cold even during power outages (keeps frozen up to 24hrs)
• Adjustable thermostat for precise temperature control
• Wire basket for easy organisation of smaller items
• Low noise compressor — quiet operation day and night
• R600a eco-friendly refrigerant — energy efficient and ozone-safe

IDEAL FOR: Meat, fish, vegetables, ice cream, drinks, pharmaceutical storage

IN THE BOX: Deep Freezer unit, wire basket, user manual, warranty card.`,
    priceKobo: 8_000_000,
    category: "Home & Office",
    stock: 20,
    imageUrl: "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
    images: [
      "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
      "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a6wm-front.jpg",
      "https://www.koolatron.com/cdn/shop/files/KTCF195-ECOM-01.jpg?v=1713895192",
    ],
  },
  {
    name: "219L LG Double Door Refrigerator — GL-B221ALLB",
    description: `The LG 219L Double Door Refrigerator delivers smart cooling, sleek design, and dependable performance for every Nigerian kitchen.

KEY FEATURES:
• 219-litre total capacity — generous storage for families of 4–6
• Smart Diagnosis™ — LG's app-based troubleshooting technology
• Linear Compressor — quieter, more energy-efficient, 10-year warranty
• Multi Air Flow system — circulates cold air evenly throughout every shelf
• Toughened glass shelves — hold up to 100kg, easy to clean
• Twist Ice Maker — makes ice without a separate icemaker
• Door Cooling+ — cools the door compartments as effectively as the main section

IN THE BOX: Refrigerator unit, removable shelves, crisper drawers, user manual, warranty card.`,
    priceKobo: 7_500_000,
    category: "Home & Office",
    stock: 15,
    imageUrl: "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg",
    images: [
      "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg",
      "https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-s312spzx/gallery/GL-S312SPZX-2010x1334-1.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800",
      "https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/2026/glt4026snpz/gallery/GLT4026SNPZ-DZ-01.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800",
    ],
  },
  {
    name: "Hisense 8KG Top Load Washing Machine — WTX8012T",
    description: `Experience powerful, efficient cleaning with the Hisense 8KG Top Load Washing Machine. Designed to handle large laundry loads with ease.

KEY FEATURES:
• 8kg drum capacity — handles bedsheets, curtains, and large family loads
• 12 wash programs — Normal, Delicate, Heavy Duty, Quick Wash, Spin Only, and more
• Fuzzy logic control — automatically senses load size and adjusts water and time
• 700 RPM spin speed — extracts more water so clothes dry faster
• Magic Filter — traps lint and debris from every wash cycle
• Child lock — prevents accidental changes during cycles
• Water level selector — 4 levels for precise water usage
• Delay start — schedule washes up to 24 hours in advance

IN THE BOX: Washing machine, inlet hose, drain hose, user manual, warranty card.`,
    priceKobo: 5_000_000,
    category: "Home & Office",
    stock: 18,
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/levant/ww90t554daw1le/gallery/levant-top-loading-wa90t5260bw-wa90t5260bwlev-frontblack-thumb-368318056?$650_519_PNG$",
    images: [
      "https://images.samsung.com/is/image/samsung/p6pim/levant/ww90t554daw1le/gallery/levant-top-loading-wa90t5260bw-wa90t5260bwlev-frontblack-thumb-368318056?$650_519_PNG$",
      "https://www.lg.com/content/dam/channel/wcms/in/images/washing-machines/t80ajmb1z-abmqeil/gallery/D-1.jpg",
      "https://www.hisense.com.ng/wp-content/uploads/2022/11/WM-front-view.jpg",
    ],
  },
  {
    name: "Sumec Firman 3KVA Generator — SPG3000E2",
    description: `Reliable power for Nigerian homes and small businesses. The Sumec Firman 3KVA Generator delivers clean, stable electricity through outages.

KEY FEATURES:
• 3KVA / 2.5KW rated output — powers TVs, fans, fridges, lights simultaneously
• Electric start — key-start for effortless operation
• AVR (Automatic Voltage Regulator) — protects appliances from power surges
• 15-litre fuel tank — up to 8 hours of continuous run time
• Low oil shutdown — automatically cuts engine to prevent damage
• 2× 13A outlets + 1× 12V DC outlet
• Copper winding alternator — more durable and efficient
• Noise level: ~75dB at 7m — quieter than most generators in class

IN THE BOX: Generator, user manual, tool kit, funnel, warranty card (12 months).`,
    priceKobo: 7_000_000,
    category: "Home & Office",
    stock: 12,
    imageUrl: "https://m.media-amazon.com/images/I/61RsZz+CUVL._AC_SL1001_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61RsZz+CUVL._AC_SL1001_.jpg",
      "https://m.media-amazon.com/images/I/71FbJkB+jGL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81V+oRSbhiL._AC_SL1500_.jpg",
    ],
  },
  {
    name: "Morning Glory Orthopedic Foam Mattress — 6×4.5ft Queen",
    description: `Sleep better every night with the Morning Glory Orthopedic Foam Mattress. Designed specifically for Nigerian climates and sleeping habits.

KEY FEATURES:
• 6ft × 4.5ft Queen size — fits standard Nigerian bed frames
• High-density orthopedic foam — firm support for spine alignment
• Breathable stretch knit fabric — stays cool and comfortable all night
• Anti-dust mite and anti-bacterial treatment
• 10cm thickness — substantial cushioning without sagging
• Medium-firm feel — ideal for back and side sleepers
• Compression-rolled for easy delivery and setup

COMES WITH: Mattress, carry bag. 2-year manufacturer warranty.`,
    priceKobo: 4_500_000,
    category: "Home & Office",
    stock: 25,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6FBjzl_zAC70vmVmLiSNiN2F_LnbTKBdCQg&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6FBjzl_zAC70vmVmLiSNiN2F_LnbTKBdCQg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXb9h8UWhBtfHYq1lPnmxj8Fl8w77YS4aWw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzqFHQrIWO6kVlnnlKnLmSJlcfJsF6yJ29Vg&s",
    ],
  },

  // ── Electronics ──────────────────────────────────────────────────────────────
  {
    name: "43\" LG UHD Smart TV — 43UP7550",
    description: `Immerse yourself in stunning 4K UHD picture quality with the LG 43-inch Smart TV. Perfect for Nigerian living rooms.

KEY FEATURES:
• 43-inch 4K UHD IPS display — vivid colours and wide viewing angles
• webOS Smart TV — Netflix, YouTube, Prime Video built-in
• ThinQ AI — voice control with Google Assistant & Alexa
• 20W stereo sound with Dolby Audio
• 3× HDMI, 2× USB, Bluetooth 5.0, Wi-Fi
• Magic Remote included — point, click, scroll
• Filmmaker Mode — watch movies exactly as directors intended
• Game Optimizer — reduces input lag for console gaming

IN THE BOX: TV, magic remote, power cable, stand, user manual.`,
    priceKobo: 7_000_000,
    category: "Electronics",
    stock: 10,
    imageUrl: "https://www.lg.com/content/dam/channel/wcms/ng/images/tvs/43up7550pvg-awb/gallery/D-01.jpg",
    images: [
      "https://www.lg.com/content/dam/channel/wcms/ng/images/tvs/43up7550pvg-awb/gallery/D-01.jpg",
      "https://www.lg.com/content/dam/channel/wcms/ng/images/tvs/43up7550pvg-awb/gallery/D-02.jpg",
      "https://www.lg.com/content/dam/channel/wcms/ng/images/tvs/43up7550pvg-awb/gallery/D-04.jpg",
    ],
  },
  {
    name: "Hisense 55\" QLED 4K Smart TV — 55U6K",
    description: `Experience cinema-quality visuals at home with the Hisense 55-inch QLED 4K Smart TV. Quantum Dot technology delivers over a billion colours.

KEY FEATURES:
• 55-inch QLED Quantum Dot display — 100% DCI-P3 colour gamut
• 4K UHD resolution with Dolby Vision HDR
• Hi-View Engine Pro — AI-powered picture upscaling
• VIDAA Smart OS — fast, simple, loaded with streaming apps
• Dolby Atmos 3D surround sound (30W)
• Game Mode Pro — 4K@144Hz, VRR, ALLM support
• 4× HDMI 2.1, 3× USB, Wi-Fi 6, Bluetooth 5.1
• Hands-free voice control

IN THE BOX: TV, remote, stand, power cable, user manual.`,
    priceKobo: 12_000_000,
    category: "Electronics",
    stock: 8,
    imageUrl: "https://www.hisense.com.ng/wp-content/uploads/2023/08/55U6K.jpg",
    images: [
      "https://www.hisense.com.ng/wp-content/uploads/2023/08/55U6K.jpg",
      "https://www.hisense.com.ng/wp-content/uploads/2023/08/55U6K-side.jpg",
      "https://www.hisense.com.ng/wp-content/uploads/2023/08/55U6K-back.jpg",
    ],
  },
  {
    name: "Soundcore by Anker Motion Boom Plus Bluetooth Speaker",
    description: `Bring the party anywhere with the Soundcore Motion Boom Plus — big bass, massive battery, fully waterproof.

KEY FEATURES:
• 80W stereo sound — two tweeters + two woofers + passive radiators
• BassUp™ technology — real-time bass enhancement
• IPX7 waterproof — fully submersible up to 1 metre
• 20-hour playtime on a single charge; charges via USB-C
• Titanium composite diaphragm tweeters — crystal-clear highs
• Outdoor EQ mode — boosts sound for open-air environments
• Party Connect — sync up to 100 Soundcore speakers
• Built-in power bank — charge your phone on the go

IN THE BOX: Speaker, USB-C cable, user manual.`,
    priceKobo: 3_500_000,
    category: "Electronics",
    stock: 30,
    imageUrl: "https://m.media-amazon.com/images/I/71yFNVOEtDL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71yFNVOEtDL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71mfVpOHWjL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71Q2Kq8BQNL._AC_SL1500_.jpg",
    ],
  },

  // ── Phones & Tablets ─────────────────────────────────────────────────────────
  {
    name: "Tecno Camon 40 Pro 5G — 256GB",
    description: `The Tecno Camon 40 Pro 5G is built for Nigerian content creators and power users who want flagship performance without the flagship price tag.

KEY FEATURES:
• 6.78-inch AMOLED display — 144Hz refresh rate, 1300 nits peak brightness
• 50MP main camera + 50MP periscope telephoto (5× optical zoom)
• 32MP front camera with face unlock
• MediaTek Dimensity 8200 processor — 5G-ready
• 256GB storage + 8GB RAM (expandable)
• 5000mAh battery with 70W flash charge — full charge in 45 mins
• Android 14 with HiOS 14

IN THE BOX: Phone, 70W charger, USB-C cable, case, screen protector.`,
    priceKobo: 14_000_000,
    category: "Phones & Tablets",
    stock: 20,
    imageUrl: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/54/8141962/1.jpg",
    images: [
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/54/8141962/1.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/54/8141962/2.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/54/8141962/3.jpg",
    ],
  },
  {
    name: "Samsung Galaxy A55 5G — 128GB Awesome Iceblue",
    description: `The Samsung Galaxy A55 5G brings Galaxy AI features, stunning design, and reliable performance to the mid-range segment.

KEY FEATURES:
• 6.6-inch Super AMOLED display — 120Hz, 1000 nits, Gorilla Glass Victus+
• 50MP OIS main + 12MP ultrawide + 5MP macro triple camera
• 32MP selfie camera
• Exynos 1480 octa-core processor — 5G-ready
• 128GB storage + 8GB RAM (expandable to 1TB)
• 5000mAh battery + 25W fast charging
• IP67 dust and water resistant
• Android 14, 4 OS upgrades guaranteed

IN THE BOX: Phone, 25W charger, USB-C cable, SIM tool.`,
    priceKobo: 11_000_000,
    category: "Phones & Tablets",
    stock: 25,
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/ng/2401/gallery/ng-galaxy-a55-sm-a556-sm-a556ezaafwz-thumb-539746552",
    images: [
      "https://images.samsung.com/is/image/samsung/p6pim/ng/2401/gallery/ng-galaxy-a55-sm-a556-sm-a556ezaafwz-thumb-539746552",
      "https://images.samsung.com/is/image/samsung/p6pim/ng/sm-a556ezkafwz/gallery/ng-galaxy-a55-sm-a556-sm-a556ezkafwz-thumb-539746629",
      "https://images.samsung.com/is/image/samsung/p6pim/ng/2401/gallery/ng-galaxy-a55-sm-a556-sm-a556elgafwz-thumb-539746537",
    ],
  },
  {
    name: "Infinix Hot 50 Pro — 256GB Stellar Black",
    description: `The Infinix Hot 50 Pro gives you more storage, more speed, and a bigger battery — all under ₦100,000.

KEY FEATURES:
• 6.78-inch AMOLED display — 120Hz smooth scrolling
• 108MP AI triple camera with night mode
• 16MP front camera with dual flash
• Helio G100 processor — smooth gaming and multitasking
• 256GB + 8GB RAM (expandable via memory card)
• 5000mAh battery + 45W fast charging
• Android 14 with XOS 14
• Side-mounted fingerprint scanner

IN THE BOX: Phone, 45W charger, USB-C cable, protective case.`,
    priceKobo: 8_500_000,
    category: "Phones & Tablets",
    stock: 35,
    imageUrl: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/97/4220582/1.jpg",
    images: [
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/97/4220582/1.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/97/4220582/2.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/97/4220582/3.jpg",
    ],
  },
  {
    name: "Apple iPad 10th Gen — 64GB Wi-Fi Silver",
    description: `The iPad 10th generation brings a complete redesign with a larger display, powerful A14 chip, and an all-day battery.

KEY FEATURES:
• 10.9-inch Liquid Retina display — True Tone, 500 nits
• A14 Bionic chip — faster than most laptops
• 12MP wide rear camera, 12MP ultrawide front camera with Centre Stage
• USB-C connector with 5Gbps data transfer
• Wi-Fi 6, Bluetooth 5.2
• 64GB storage — plenty for apps, photos, and videos
• All-day 28-hour battery life
• iPadOS 17 — multitasking, collaboration, productivity

COMPATIBLE WITH: Apple Pencil (1st gen), Magic Keyboard Folio.

IN THE BOX: iPad, USB-C charge cable, USB-C 20W power adapter.`,
    priceKobo: 28_000_000,
    category: "Phones & Tablets",
    stock: 10,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-silver-wifi_FMT_WHH",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-silver-wifi_FMT_WHH",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi_FMT_WHH",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-pink-wifi_FMT_WHH",
    ],
  },

  // ── Computing ────────────────────────────────────────────────────────────────
  {
    name: "HP 15s-eq3000 Laptop — Ryzen 5 / 8GB / 512GB SSD",
    description: `Slim, fast, and built for work — the HP 15s is the go-to laptop for Nigerian students, professionals, and entrepreneurs.

KEY FEATURES:
• 15.6-inch FHD IPS display — anti-glare, micro-edge
• AMD Ryzen 5 5500U processor — 6 cores, up to 4GHz
• 8GB DDR4 RAM — smooth multitasking
• 512GB PCIe NVMe SSD — boots in seconds, loads instantly
• AMD Radeon integrated graphics
• Wi-Fi 5, Bluetooth 4.2, USB-A×2, USB-C, HDMI
• Windows 11 Home pre-installed
• Up to 8.5 hours battery life

IN THE BOX: Laptop, 65W USB-C charger, documentation.`,
    priceKobo: 38_000_000,
    category: "Computing",
    stock: 12,
    imageUrl: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/knivel/c08000000/c08037000/c08037673.png",
    images: [
      "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/knivel/c08000000/c08037000/c08037673.png",
      "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/knivel/c08000000/c08037000/c08037674.png",
      "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/knivel/c08000000/c08037000/c08037675.png",
    ],
  },
  {
    name: "Lenovo IdeaPad Slim 3 — Intel Core i5 / 16GB / 512GB SSD",
    description: `The Lenovo IdeaPad Slim 3 is a powerhouse thin-and-light laptop perfect for everyday computing, video calls, and light creative work.

KEY FEATURES:
• 15.6-inch FHD IPS display — 300 nits, TÜV Rheinland eye-care certified
• Intel Core i5-1235U — 10-core hybrid architecture
• 16GB LPDDR5 RAM — effortless multitasking
• 512GB M.2 NVMe SSD — fast, silent, reliable
• Intel Iris Xe Graphics — great for presentations and light photo editing
• Wi-Fi 6, Bluetooth 5.1, USB-C with PD, HDMI 1.4
• Windows 11 Home, Microsoft Office pre-loaded
• Up to 9 hours battery life

IN THE BOX: Laptop, 65W slim-tip charger.`,
    priceKobo: 45_000_000,
    category: "Computing",
    stock: 10,
    imageUrl: "https://p1-ofp.static.pub/fes/cms/2022/09/01/k8l7w8n2k7qzshfwv2ljw1vb1gv7ms359946.png",
    images: [
      "https://p1-ofp.static.pub/fes/cms/2022/09/01/k8l7w8n2k7qzshfwv2ljw1vb1gv7ms359946.png",
      "https://p1-ofp.static.pub/fes/cms/2022/09/01/q5cjjz12d1yoosol17uuq4o4rhj6h2857051.png",
      "https://p1-ofp.static.pub/fes/cms/2022/09/01/dffnxl5pvvs4p5jj6nbq8gdge5jbsq859947.png",
    ],
  },
  {
    name: "Logitech MX Master 3S Wireless Mouse",
    description: `The gold standard for productivity — the MX Master 3S features ultra-fast scrolling, whisper-quiet clicks, and 8K DPI precision.

KEY FEATURES:
• 8000 DPI Darkfield sensor — works on any surface including glass
• MagSpeed electromagnetic scrolling — 1000 lines/second
• Quiet clicks — 90% quieter than standard mouse
• Connects to up to 3 devices via Bluetooth or USB receiver
• USB-C rechargeable — 3 hours charge = 70 days use
• Customisable 7 buttons with Logi Options+ software
• Ergonomic thumb rest — reduces wrist fatigue
• Works on Windows, macOS, Linux, Chrome OS, iPadOS

IN THE BOX: Mouse, USB-C cable, USB receiver.`,
    priceKobo: 2_800_000,
    category: "Computing",
    stock: 40,
    imageUrl: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
    images: [
      "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
      "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-side-view-graphite.png",
      "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-bottom-view-graphite.png",
    ],
  },

  // ── Fashion ──────────────────────────────────────────────────────────────────
  {
    name: "Men's Polo Ralph Lauren Classic Fit Polo Shirt",
    description: `The timeless Ralph Lauren Polo Shirt — crafted in soft cotton piqué for comfort, style, and all-day wear.

KEY FEATURES:
• 100% combed soft cotton piqué fabric
• Classic fit — relaxed through chest, waist, and hips
• Three-button placket with signature embroidered Polo Pony
• Ribbed collar and sleeve cuffs
• Side vents for ease of movement
• Machine washable — stays fresh wash after wash
• Available in sizes S, M, L, XL, XXL

AVAILABLE COLOURS: White, Navy, Red, Black, Forest Green

Perfect for office smart-casual, weekend outings, and events.`,
    priceKobo: 1_500_000,
    category: "Fashion",
    stock: 60,
    imageUrl: "https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/default/dw3ade71ef/2022/images/LP/PIM/lp_pim_mesh_polo.jpg",
    images: [
      "https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/default/dw3ade71ef/2022/images/LP/PIM/lp_pim_mesh_polo.jpg",
      "https://m.media-amazon.com/images/I/71P9Zz+xFBL._AC_UX569_.jpg",
      "https://m.media-amazon.com/images/I/71DnX3tRCML._AC_UX569_.jpg",
    ],
  },
  {
    name: "Women's Ankara Wrap Midi Dress — Mixed Prints",
    description: `Celebrate African fashion with this stunning Ankara Wrap Midi Dress — bold prints, flattering silhouette, built for the modern Nigerian woman.

KEY FEATURES:
• Premium Dutch wax Ankara fabric — vibrant, colourfast, breathable
• Wrap-front design — adjustable, flatters all body types
• Midi length — falls just below the knee
• Short flutter sleeves
• Fully lined — no see-through
• Available in sizes S, M, L, XL, XXL, XXXL
• Machine washable — cold wash, hang dry

STYLE TIPS: Pair with block heels or wedges for events; wear with sandals for casual outings.

Handcrafted in Lagos.`,
    priceKobo: 850_000,
    category: "Fashion",
    stock: 50,
    imageUrl: "https://i.etsystatic.com/24024215/r/il/5d0c9c/3102641086/il_1588xN.3102641086_lyok.jpg",
    images: [
      "https://i.etsystatic.com/24024215/r/il/5d0c9c/3102641086/il_1588xN.3102641086_lyok.jpg",
      "https://i.etsystatic.com/24024215/r/il/3a7e20/3056125388/il_1588xN.3056125388_fovh.jpg",
      "https://i.etsystatic.com/24024215/r/il/3b7082/3056125022/il_1588xN.3056125022_3uzo.jpg",
    ],
  },
  {
    name: "Nike Air Force 1 '07 Sneakers — White/White",
    description: `The icon that never goes out of style. The Nike Air Force 1 '07 is clean, classic, and always fresh.

KEY FEATURES:
• Full-grain leather upper — durable, easy to clean
• Perforations on toe box for breathability
• Pivot circle on outsole — multi-directional traction
• Padded collar and ankle — secure, comfortable fit
• Nike Air cushioning in midsole — all-day comfort
• Rubber outsole — excellent grip on all surfaces
• Available in sizes UK 5 to UK 12

Originally designed for basketball, now the most popular street sneaker in the world.

IN THE BOX: Shoes (pair), extra laces, shoe bag.`,
    priceKobo: 6_500_000,
    category: "Fashion",
    stock: 30,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b0a077f4-553e-4c9a-b8e1-2c3ca0bd3f72/air-force-1-07-mens-shoes-jBrhbr.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/4e5a4e89-6ba1-4c69-8fa4-b419b0c36a5d/air-force-1-07-mens-shoes-jBrhbr.png",
    ],
  },
  {
    name: "Ladies' Genuine Leather Tote Bag — Tan Brown",
    description: `A classic everyday tote crafted from genuine full-grain leather — roomy, structured, and built to last years.

KEY FEATURES:
• Full-grain cowhide leather — develops a rich patina over time
• Spacious main compartment — fits 13-inch laptop, files, and daily essentials
• Interior: 2 open pockets + 1 zip pocket
• Exterior: 1 back zip pocket
• Magnetic snap closure
• Top carry handles + detachable crossbody strap
• Tarnish-free gold-tone hardware
• Dimensions: 38cm × 28cm × 14cm

Available in: Tan Brown, Black, Burgundy

Handcrafted. Each bag is uniquely yours.`,
    priceKobo: 3_200_000,
    category: "Fashion",
    stock: 25,
    imageUrl: "https://m.media-amazon.com/images/I/81Cj1IQNKLL._AC_UY695_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81Cj1IQNKLL._AC_UY695_.jpg",
      "https://m.media-amazon.com/images/I/71V-bGRhK5L._AC_UY695_.jpg",
      "https://m.media-amazon.com/images/I/71KUFl-YHNL._AC_UY695_.jpg",
    ],
  },

  // ── Supermarket ──────────────────────────────────────────────────────────────
  {
    name: "Dangote Sugar Refinery — 50kg Bag Granulated Sugar",
    description: `Premium quality Dangote refined sugar — Nigeria's most trusted household staple for cooking, baking, and beverages.

KEY FEATURES:
• 50kg net weight — bulk-buy savings for families and businesses
• Fine granulated sugar — dissolves instantly, no clumping
• Made in Nigeria — fresh from Dangote refinery
• NAFDAC approved
• Best for: tea, baking, soft drinks, cooking, confectionery

STORAGE: Store in a cool, dry place. Once opened, transfer to an airtight container.`,
    priceKobo: 800_000,
    category: "Supermarket",
    stock: 100,
    imageUrl: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/2672372/1.jpg",
    images: [
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/2672372/1.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/2672372/2.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/2672372/3.jpg",
    ],
  },
  {
    name: "Milo Energy Drink Tin — 400g × 3 Pack",
    description: `Nigeria's favourite chocolate malt drink — Milo provides energy and essential nutrients for the whole family.

KEY FEATURES:
• 400g × 3 tins — bulk pack for everyday value
• Rich in B vitamins, calcium, iron, and vitamin D
• ACTIV-GO™ formula — sustained energy release
• Delicious chocolate-malt flavour — loved by kids and adults
• Mixes instantly in hot or cold milk
• NAFDAC approved
• Suitable for all ages 3 and above

SERVING SUGGESTION: 3 heaped teaspoons in warm milk. Add sugar to taste.`,
    priceKobo: 650_000,
    category: "Supermarket",
    stock: 150,
    imageUrl: "https://m.media-amazon.com/images/I/71bJf0fZZwL._SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71bJf0fZZwL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81p4nh8j+bL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71C6XA0fNDL._SL1500_.jpg",
    ],
  },
  {
    name: "Indomie Instant Noodles — Chicken Flavour (40 packs × 70g)",
    description: `Nigeria's number one instant noodles — Indomie Chicken Flavour. Ready in 3 minutes, loved by millions.

KEY FEATURES:
• Carton of 40 packs × 70g — great value for families and caterers
• Rich chicken seasoning — soup base, seasoning powder, and oil sachets included
• Ready in 3 minutes — boil or fry
• Fortified with vitamins A, B1, B2, B3, and iron
• NAFDAC approved, Halal certified
• Made in Nigeria by Dufil Prima Foods

SERVING IDEAS: Boiled with egg, fried with vegetables, with sardines.`,
    priceKobo: 320_000,
    category: "Supermarket",
    stock: 200,
    imageUrl: "https://m.media-amazon.com/images/I/81xGbkWKBML._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81xGbkWKBML._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71nNmIu5k5L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71I1cGxN2aL._AC_SL1500_.jpg",
    ],
  },

  // ── Kitchen & Dining ─────────────────────────────────────────────────────────
  {
    name: "Scanfrost 5-Burner Gas Cooker with Oven — SFCK5500",
    description: `A robust, high-capacity gas cooker that handles the demands of the Nigerian kitchen — big pots, strong flames, and a full oven.

KEY FEATURES:
• 5 gas burners — 1 triple ring wok burner + 4 standard burners
• Full-size oven with grill — 80-litre capacity
• Tempered glass lid and oven door
• Automatic ignition — no matches needed
• Cast iron pan supports — stable even for large pots
• Flame failure safety device — gas cuts off automatically
• Stainless steel body — easy to clean, rust-resistant
• LPG compatible (Abuja gas, Blue gas, Cooks gas)

IN THE BOX: Cooker, grill pan, 2 oven trays, LPG hose, user manual.`,
    priceKobo: 18_000_000,
    category: "Kitchen & Dining",
    stock: 8,
    imageUrl: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/6285072/1.jpg",
    images: [
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/6285072/1.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/6285072/2.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/6285072/3.jpg",
    ],
  },
  {
    name: "Stainless Steel Cookware Set — 8 Pieces",
    description: `A complete cookware set for the modern Nigerian kitchen — stainless steel construction, compatible with all cookers including induction.

WHAT'S IN THE SET (8 pieces):
• 16cm saucepan with lid
• 20cm saucepan with lid
• 24cm casserole pot with lid
• 24cm non-stick frying pan
• Stainless steel steamer insert

KEY FEATURES:
• 18/10 stainless steel — food-safe, non-reactive, rust-proof
• Tri-ply base — even heat distribution, no hot spots
• Stay-cool riveted handles — oven-safe to 200°C
• Dishwasher safe
• Compatible with gas, electric, ceramic, and induction cookers

Perfect starter set for new homes, newlyweds, and kitchen upgrades.`,
    priceKobo: 2_500_000,
    category: "Kitchen & Dining",
    stock: 35,
    imageUrl: "https://m.media-amazon.com/images/I/81+LXEF9w4L._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81+LXEF9w4L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71bXBB3YQDL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71hVoKepNaL._AC_SL1500_.jpg",
    ],
  },
  {
    name: "Binatone Table Blender — BLG-403",
    description: `Blend, chop, and crush with ease — the Binatone Table Blender is a Nigerian kitchen staple for smoothies, pepper, tomatoes, and more.

KEY FEATURES:
• 1.5-litre hardened glass jar — heat-resistant, BPA-free
• 400W powerful motor — blends tough ingredients with ease
• 4 stainless steel blades — sharp, durable, rust-proof
• 2 speed settings + pulse function
• Suction cup base — stays firmly in place during use
• Easy-clean design — jar detaches for cleaning
• Compatible with Nigerian 220V power supply

IDEAL FOR: Pepper, tomatoes, smoothies, egusi grinding, nuts, ice crushing.

IN THE BOX: Blender base, glass jar, lid, user manual.`,
    priceKobo: 900_000,
    category: "Kitchen & Dining",
    stock: 50,
    imageUrl: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/94/1059191/1.jpg",
    images: [
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/94/1059191/1.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/94/1059191/2.jpg",
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/94/1059191/3.jpg",
    ],
  },

  // ── Health & Beauty ──────────────────────────────────────────────────────────
  {
    name: "Neutrogena Hydro Boost Water Gel Moisturiser — 50ml",
    description: `Dermatologist-recommended. The Neutrogena Hydro Boost Water Gel delivers intense, long-lasting hydration for all skin types.

KEY FEATURES:
• Hyaluronic acid formula — absorbs and retains moisture up to 1000× its weight
• Oil-free, non-comedogenic — won't block pores
• Lightweight gel texture — absorbs instantly, no greasiness
• 72-hour hydration — keeps skin soft all day and night
• Fragrance-free — safe for sensitive skin
• Dermatologist and ophthalmologist tested
• 50ml — great for daily use and travel

SUITABLE FOR: Normal, oily, combination, and dry skin types.

HOW TO USE: Apply a generous amount to cleansed face morning and night.`,
    priceKobo: 450_000,
    category: "Health & Beauty",
    stock: 80,
    imageUrl: "https://www.neutrogena.com/dw/image/v2/BBPV_PRD/on/demandware.static/-/Sites-NGP-master-catalog/default/dw4f81aad0/images/pdp/neutrogena-hydro-boost-face-moisturizer-water-gel-1-7-oz-070501089707-t1.jpg",
    images: [
      "https://www.neutrogena.com/dw/image/v2/BBPV_PRD/on/demandware.static/-/Sites-NGP-master-catalog/default/dw4f81aad0/images/pdp/neutrogena-hydro-boost-face-moisturizer-water-gel-1-7-oz-070501089707-t1.jpg",
      "https://www.neutrogena.com/dw/image/v2/BBPV_PRD/on/demandware.static/-/Sites-NGP-master-catalog/default/dwa4a614f2/images/pdp/neutrogena-hydro-boost-face-moisturizer-water-gel-1-7-oz-070501089707-t2.jpg",
      "https://www.neutrogena.com/dw/image/v2/BBPV_PRD/on/demandware.static/-/Sites-NGP-master-catalog/default/dwe88bc2c5/images/pdp/neutrogena-hydro-boost-face-moisturizer-water-gel-1-7-oz-070501089707-t3.jpg",
    ],
  },
  {
    name: "ORS Olive Oil Relaxer Kit — Normal / Super",
    description: `The ORS Olive Oil Relaxer Kit is the most trusted at-home hair relaxer kit for Nigerian women — smooth, shiny, healthy results every time.

KEY FEATURES:
• Olive oil-enriched formula — conditions as it relaxes, reduces breakage
• Available in Normal (for medium-textured hair) and Super (for coarse, resistant hair)
• Kit includes: relaxer cream, neutralising shampoo, moisturising conditioner, gloves
• pH-balanced — gentle on scalp and hair shaft
• Paraben-free formula
• Leaves hair manageable, soft, and full of shine
• NAFDAC approved

HOW TO USE: Follow included step-by-step instruction card. Patch test 48hrs before use.`,
    priceKobo: 380_000,
    category: "Health & Beauty",
    stock: 100,
    imageUrl: "https://m.media-amazon.com/images/I/71WfFiT-GQL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71WfFiT-GQL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71nRFkALmkL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61Vk0PgvKaL._AC_SL1500_.jpg",
    ],
  },
  {
    name: "Philips BRE245 Epilator — Women's Hair Removal",
    description: `Smooth, hair-free skin for up to 4 weeks — the Philips BRE245 Epilator removes hair from the root for lasting results.

KEY FEATURES:
• 20 tweezers — removes hair as short as 0.5mm
• Corded and cordless operation — flexible use anywhere
• 2 speeds — gentle mode for sensitive areas, efficient mode for legs
• Washable head — clean under running water
• Smartlight LED — highlights even the finest hairs
• Massage cap included — reduces discomfort
• Battery indicator and charging light

AREAS: Legs, underarms, bikini line, arms. For external use only.

IN THE BOX: Epilator, massage cap, efficiency cap, charging cord.`,
    priceKobo: 1_800_000,
    category: "Health & Beauty",
    stock: 45,
    imageUrl: "https://www.philips.com.ng/c-dam/b2c/category-pages/Personal-care/Epilators/BRE245-00/BRE245-00_A01.jpg",
    images: [
      "https://www.philips.com.ng/c-dam/b2c/category-pages/Personal-care/Epilators/BRE245-00/BRE245-00_A01.jpg",
      "https://www.philips.com.ng/c-dam/b2c/category-pages/Personal-care/Epilators/BRE245-00/BRE245-00_A02.jpg",
      "https://www.philips.com.ng/c-dam/b2c/category-pages/Personal-care/Epilators/BRE245-00/BRE245-00_A03.jpg",
    ],
  },

  // ── Sporting Goods ───────────────────────────────────────────────────────────
  {
    name: "Decathlon Domyos Weight Training Dumbbell Set — 20kg",
    description: `Build strength at home with the Decathlon Domyos 20kg adjustable dumbbell set — compact, safe, and perfect for Nigerian home gyms.

KEY FEATURES:
• Total weight: 20kg (2× bars + plates: 4×1.25kg, 4×2.5kg, 4×5kg)
• Chrome steel bars with knurled grip — anti-slip, comfortable
• Standard 25mm collar diameter
• Spin-lock collars included — secure, quick to adjust
• Rubber-coated plates — protects floors, reduces noise
• Suitable for: bicep curls, shoulder press, rows, lunges, and more

INCLUDES: 2 chrome bars + 12 rubber weight plates + 4 spin-lock collars.`,
    priceKobo: 4_500_000,
    category: "Sporting Goods",
    stock: 20,
    imageUrl: "https://contents.mediadecathlon.com/p2268025/k$c4c41e63a8c0f9e70eb19c0e03abbe55/adjustable-dumbbell-20kg.jpg",
    images: [
      "https://contents.mediadecathlon.com/p2268025/k$c4c41e63a8c0f9e70eb19c0e03abbe55/adjustable-dumbbell-20kg.jpg",
      "https://contents.mediadecathlon.com/p2268026/k$45ddd96c4d1ee3fad9a5d2c5c7c8e5f4/adjustable-dumbbell-20kg-2.jpg",
      "https://contents.mediadecathlon.com/p1714501/k$8e4c3db70a32be4765e45e9c9a83a29f/dumbbell-set-20kg.jpg",
    ],
  },
  {
    name: "Nike Phantom GX Academy FG/MG Football Boots",
    description: `Designed for the pitch, built for Nigerian football — the Nike Phantom GX Academy delivers precision passing, sharp feel, and reliable traction.

KEY FEATURES:
• Integrated knit upper — second-skin fit, natural ball feel
• Grip-Tex texture on strike zone — enhances ball control and spin
• FG/MG outsole — firm ground (natural grass) + multi-ground (artificial pitches)
• Stud configuration optimised for quick directional changes
• Removable insole — easy to clean and replace
• Available in sizes UK 6–12

Compatible with: Natural grass, artificial grass (4G & 5G), dry hard ground.

IN THE BOX: Boots (pair), laces, boot bag.`,
    priceKobo: 5_500_000,
    category: "Sporting Goods",
    stock: 25,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3cb66f21-dae0-4e34-9f54-c4e71c5b4d81/phantom-gx-academy-fg-mg-football-boots-pslL3R.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3cb66f21-dae0-4e34-9f54-c4e71c5b4d81/phantom-gx-academy-fg-mg-football-boots-pslL3R.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c62c77a2-cb84-4c4d-8e59-e67a41afac38/phantom-gx-academy-fg-mg-football-boots-pslL3R.png",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/be2f17f7-dfed-44e0-b07b-1e0d0afb543d/phantom-gx-academy-fg-mg-football-boots-pslL3R.png",
    ],
  },

  // ── Baby Products ────────────────────────────────────────────────────────────
  {
    name: "Pampers Premium Care Diapers — Size 4 (9–14kg) × 52 Count",
    description: `Pampers Premium Care — the softest diaper for your baby's most sensitive skin. Trusted by Nigerian mums for decades.

KEY FEATURES:
• Size 4 — fits babies 9–14kg (typically 4–18 months)
• 52 diapers per pack — great value
• SkinLove™ lotion with shea butter — moisturises with every use
• 360° softness — softer than cotton on all sides
• Airloc™ channels — lock away wetness and odour for up to 12 hours
• Ultra-dry core — keeps baby's skin dry and comfortable
• Flexible waistband — moves with baby, no marks
• DERMATOLOGICALLY tested, paediatrician recommended

NAFDAC approved. Imported.`,
    priceKobo: 850_000,
    category: "Baby Products",
    stock: 120,
    imageUrl: "https://m.media-amazon.com/images/I/71ABKN8PCWL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71ABKN8PCWL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81KQn+XrWoL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71+AvQJ9hwL._AC_SL1500_.jpg",
    ],
  },
  {
    name: "Baby Trend Expedition Jogger Travel System — Stroller + Infant Car Seat",
    description: `Everything you need to travel with your newborn — the Baby Trend Expedition Jogger Travel System includes a jogger stroller and compatible infant car seat.

KEY FEATURES:
• Jogger stroller with air-filled tyres — smooth ride on all terrains
• EZlocK™ buckle — one-hand attachment of car seat to stroller
• Flex-Loc infant car seat — fits babies 2.3–16kg
• 5-point harness with EPS energy-absorbing foam — maximum safety
• Parent tray with two cup holders and storage
• Extra-large storage basket underneath stroller
• Rear-wheel disc brakes — reliable stopping power
• Adjustable canopy — UV50+ sun protection
• Folds compactly for car boot storage

SAFETY CERTIFIED: FMVSS 213, tested to exceed US federal standards.`,
    priceKobo: 12_000_000,
    category: "Baby Products",
    stock: 6,
    imageUrl: "https://m.media-amazon.com/images/I/71K7wBjNSAL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71K7wBjNSAL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71WqfHmY0yL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71PW8fLXFhL._AC_SL1500_.jpg",
    ],
  },
  {
    name: "Fisher-Price Kick & Play Piano Gym — Newborn to Toddler",
    description: `5 stages of play, from tummy time to toddler — the Fisher-Price Kick & Play Piano Gym grows with your baby from birth to 36 months.

KEY FEATURES:
• Removable light-up piano — baby kicks keys to trigger music and lights
• 70+ songs, sounds, and phrases — encourages cause-and-effect learning
• 5 repositionable toys on overhead arch — mirror, rattle, and more
• Soft mat with tummy-time pillow — supports early development
• Piano detaches to use as standalone seated toy
• 3 bonus ways to use as baby grows (newborn, sit-and-play, toddler)
• Batteries included (AA × 3)

DEVELOPMENTAL BENEFITS: Sensory exploration, motor skills, music and language.

Machine-washable mat.`,
    priceKobo: 1_600_000,
    category: "Baby Products",
    stock: 20,
    imageUrl: "https://m.media-amazon.com/images/I/71c5IhhrIGL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71c5IhhrIGL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71pBkXPP1QL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71YPWMX7G1L._AC_SL1500_.jpg",
    ],
  },
];

export async function seedProducts() {
  console.log("🌱  Seeding products…");

  const inserted = await db
    .insert(productsTable)
    .values(products)
    .onConflictDoUpdate({
      target: productsTable.name,
      set: {
        description: sql`excluded.description`,
        priceKobo: sql`excluded.price_kobo`,
        imageUrl: sql`excluded.image_url`,
        images: sql`excluded.images`,
        stock: sql`excluded.stock`,
        category: sql`excluded.category`,
        updatedAt: sql`now()`,
      },
    })
    .returning();

  console.log(`✅  Inserted ${inserted.length} products:`);
  for (const p of inserted) {
    const naira = (p.priceKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    });
    console.log(`   [${p.id}] ${p.name} — ${naira} — ${p.images.length} image(s) — ${p.category}`);
  }

  return inserted.length;
}

// Run directly when invoked as a script
if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  seedProducts().then(() => process.exit(0)).catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
}
