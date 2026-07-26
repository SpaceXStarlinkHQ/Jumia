/**
 * Seed script — populates the store with 30+ real products across all categories.
 * Run with: pnpm --filter @workspace/db run seed
 *
 * Image curation rules:
 *  • images[0] always matches imageUrl
 *  • No two images within the same product share the same URL
 *  • Primary image (images[0]) is unique per product within its category
 *  • Only URLs from confirmed-working hosts (see imageProxy allowlist)
 *  • Unsplash IDs used only when visually verified for this category
 *
 * Prices stored in kobo (₦1 = 100 kobo).
 */
import { sql } from "drizzle-orm";
import { db, productsTable } from "./index.js";

// ── Unsplash base URL helper ────────────────────────────────────────────────
const U = (id: string, w = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

// ── Confirmed Unsplash IDs (visually verified) ──────────────────────────────
const IMG = {
  // Appliances
  fridge:        U("1571175443880-49e1d25b2bc5"),   // open refrigerator
  washer:        U("1626806819282-2c1dc01a5e0c"),   // front-load white washing machine
  mattress1:     U("1631049307264-da0ec9d70304"),   // hotel white bed / mattress
  mattress2:     U("1505693416388-ac5ce068fe85"),   // upholstered bedroom / mattress

  // Electronics
  tv:            U("1593784991095-a205069470b6"),   // large smart TV home screen
  speaker1:      U("1608043152269-423dbba4e7e1"),   // bluetooth speaker on table
  speaker2:      U("1545454675-3531b543be5d"),      // wireless speaker

  // Phones
  phone_dark:    U("1598327105666-5b89351aff97"),   // smartphone angled, dark bg
  phone_mid:     U("1592750475338-74b7b21085ab"),   // smartphone held
  phone_table:   U("1567581935884-3349723552ca"),   // smartphone on table
  phone_white:   U("1574944985070-8f3ebc6b79d2"),   // smartphone, white bg

  // Laptops
  laptop1:       U("1496181133206-80ce9b88a853"),   // laptop open, side angle
  laptop2:       U("1541807084-5c52b6b3adef"),      // laptop on wooden desk
  laptop3:       U("1517336714731-489689fd1ca8"),   // laptop side view
  laptop4:       U("1555255707-c07966088b7b"),      // laptop flat lay
  laptop5:       U("1517430816045-df4b7de11d1d"),   // laptop open

  // Fashion
  polo1:         U("1583743814966-8936f5b7be1a"),   // polo shirt on display
  polo2:         U("1576566588028-4147f3842f27"),   // shirt / polo
  polo3:         U("1581655353564-df123a1eb820"),   // clothing display
  ankara:        U("1589302168068-964664d93dc0"),   // African wrap dress
  bag:           U("1584917865442-de89df76afd3"),   // structured leather tote
  shoe_lifestyle:U("1542291026-7eec264c27ff"),      // sneaker lifestyle shot
  shoe_detail:   U("1491553895911-0055eca6402d"),   // shoe close-up / detail

  // Supermarket
  grain:         U("1586201375761-83865001e31c"),   // white granulated grains / sugar
  tin_drink:     U("1544787219-7f47ccb76574"),      // beverage tin
  cocoa:         U("1542990253-a781e04c0082"),      // cocoa / chocolate drink
  choc_drink:    U("1499638673689-79a0b5115d87"),   // chocolate / malt drink
  noodles1:      U("1612929633738-8fe44f7ec841"),   // noodles in bowl
  noodles2:      U("1569718212165-3a8278d5f624"),   // noodle dish

  // Kitchen
  stove:         U("1556911220-e15b29be8c8f"),      // gas stove cooking
  pot:           U("1590794056226-79ef3a8147e1"),   // cast iron pot on stovetop
  kitchen_appl:  U("1570222094114-d054a817e56b"),   // kitchen counter appliances

  // Health & Beauty
  skincare1:     U("1556228578-8c89e6adf883"),      // skincare product
  skincare2:     U("1512290923902-8a9f81dc236c"),   // beauty cream
  skincare3:     U("1540555700478-4be289fbecef"),   // skincare bottle
  hair1:         U("1522337360788-8b13dee7a37e"),   // hair care product
  hair2:         U("1535585209827-a15fcdbc4c2d"),   // hair product
  epilator:      U("1631729371254-42c2892f0e6e"),   // personal care device

  // Sports
  dumbbells:     U("1534438327276-14e5300c3a48"),   // dumbbells / weights
  gym:           U("1571019613454-1cb2f99b2d8b"),   // gym / fitness

  // Baby
  diapers:       U("1566004100631-35d015d6a491"),   // baby with diapers
  baby1:         U("1519689680058-324335c77eba"),   // baby play items
  baby2:         U("1516733725897-1aa73b87c8e8"),   // baby lifestyle
  baby3:         U("1519689373023-dd07c7988603"),   // baby
  stroller:      U("1515488042361-ee00e0ddd4e4"),   // baby stroller / pram
} as const;

const products = [
  // ── Home & Office ────────────────────────────────────────────────────────────
  {
    name: "200L Haier Thermocool Deep Freezer — HDF-200HS",
    description: `Keep your food, drinks, and perishables frozen for longer with the Haier Thermocool 200L Deep Freezer. Built for Nigerian homes and businesses, it combines generous storage with energy efficiency and rock-solid reliability.

KEY FEATURES:
• 200-litre gross capacity — ideal for families, shops, and small businesses
• Fast-freeze function locks in freshness at -18°C
• Thick foam insulation retains cold even during power outages (keeps frozen up to 24 hrs)
• Adjustable thermostat for precise temperature control
• Wire basket for easy organisation of smaller items
• Low noise compressor — quiet operation day and night
• R600a eco-friendly refrigerant — energy efficient and ozone-safe

SPECIFICATIONS:
• Capacity: 200 L
• Freezing temperature: -18°C
• Power: 100W
• Voltage: 220–240V / 50Hz
• Dimensions: 121 cm × 58 cm × 85 cm (L×W×H)
• Weight: 37 kg
• Noise level: ≤ 42 dB
• Refrigerant: R600a (eco-friendly)

IDEAL FOR: Meat, fish, vegetables, ice cream, drinks, pharmaceutical storage.

IN THE BOX: Deep Freezer unit, wire basket, user manual, warranty card (12 months).`,
    priceKobo: 8_000_000,
    category: "Home & Office",
    stock: 20,
    // Primary: Danby chest freezer (same class of appliance — confirmed via proxy)
    imageUrl: "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
    images: [
      "https://www.danby.com/en-us/wp-content/uploads/sites/3/2025/09/dcf070a5wdb-front.jpg",
      IMG.fridge,
    ],
  },
  {
    name: "219L LG Double Door Refrigerator — GL-B221ALLB",
    description: `The LG 219L Double Door Refrigerator delivers smart cooling, sleek design, and dependable performance for every Nigerian kitchen.

KEY FEATURES:
• 219-litre total capacity — generous storage for families of 4–6
• Smart Diagnosis™ — LG's app-based troubleshooting technology
• Linear Compressor — quieter, more energy-efficient, 10-year compressor warranty
• Multi Air Flow system — circulates cold air evenly throughout every shelf
• Toughened glass shelves — hold up to 100 kg, easy to clean
• Twist Ice Maker — makes ice without a separate icemaker
• Door Cooling+ — cools the door compartments as effectively as the main section

SPECIFICATIONS:
• Total capacity: 219 L (Fridge: 163 L / Freezer: 56 L)
• Energy rating: 4-star
• Compressor: Linear Inverter
• Noise level: 36 dB
• Dimensions: 163.7 cm × 59.5 cm × 65 cm (H×W×D)
• Weight: 60 kg
• Refrigerant: R600a

IN THE BOX: Refrigerator unit, removable shelves, crisper drawers, user manual, warranty card.`,
    priceKobo: 7_500_000,
    category: "Home & Office",
    stock: 15,
    imageUrl: "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg",
    images: [
      "https://techmall-images-repo.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/29085636/LG-260L-Double-Door-Inverter-Refrigerator-Silver.jpg",
      IMG.fridge,
    ],
  },
  {
    name: "Hisense 8KG Top Load Washing Machine — WTX8012T",
    description: `Experience powerful, efficient cleaning with the Hisense 8KG Top Load Washing Machine. Designed to handle large laundry loads with ease.

KEY FEATURES:
• 8 kg drum capacity — handles bedsheets, curtains, and large family loads
• 12 wash programs — Normal, Delicate, Heavy Duty, Quick Wash, Spin Only, and more
• Fuzzy logic control — automatically senses load size and adjusts water and time
• 700 RPM spin speed — extracts more water so clothes dry faster
• Magic Filter — traps lint and debris from every wash cycle
• Child lock — prevents accidental changes during cycles
• Water level selector — 4 levels for precise water usage
• Delay start — schedule washes up to 24 hours in advance

SPECIFICATIONS:
• Load capacity: 8 kg
• Spin speed: 700 RPM
• Programs: 12
• Water inlet: Cold
• Power: 380W
• Voltage: 220V / 50Hz
• Dimensions: 85 cm × 53 cm × 50 cm (H×W×D)
• Weight: 38 kg

IN THE BOX: Washing machine, inlet hose, drain hose, user manual, warranty card.`,
    priceKobo: 5_000_000,
    category: "Home & Office",
    stock: 18,
    imageUrl: IMG.washer,
    images: [
      IMG.washer,
      IMG.kitchen_appl, // domestic appliance lifestyle context
    ],
  },
  {
    name: "Sumec Firman 3KVA Generator — SPG3000E2",
    description: `Reliable power for Nigerian homes and small businesses. The Sumec Firman 3KVA Generator delivers clean, stable electricity through outages.

KEY FEATURES:
• 3 KVA / 2.5 KW rated output — powers TVs, fans, fridges, lights simultaneously
• Electric start — key-start for effortless operation
• AVR (Automatic Voltage Regulator) — protects appliances from power surges
• 15-litre fuel tank — up to 8 hours of continuous run time
• Low oil shutdown — automatically cuts engine to prevent damage
• 2× 13A outlets + 1× 12V DC outlet
• Copper winding alternator — more durable and efficient
• Noise level: ~75 dB at 7 m — quieter than most generators in class

SPECIFICATIONS:
• Rated power: 2.5 KW / 3 KVA
• Max power: 2.8 KW
• Engine: 212cc single-cylinder 4-stroke OHV
• Fuel type: Petrol
• Tank capacity: 15 L
• Run time: ~8 hrs at 50% load
• Outlets: 2× 13A, 1× 12V DC
• Noise: ~75 dB @ 7 m
• Weight: 57 kg (dry)

IN THE BOX: Generator, user manual, tool kit, funnel, warranty card (12 months).`,
    priceKobo: 7_000_000,
    category: "Home & Office",
    stock: 12,
    imageUrl: "https://firmanpowerequipment.com/cdn/shop/products/W03082_200_900x900.png",
    images: [
      "https://firmanpowerequipment.com/cdn/shop/products/W03082_200_900x900.png",   // front view
      "https://firmanpowerequipment.com/cdn/shop/files/W03082_Hover_900x900.jpg",    // angle view
      "https://firmanpowerequipment.com/cdn/shop/files/W03082_Included_900x900.jpg", // what's in the box
    ],
  },
  {
    name: "Morning Glory Orthopedic Foam Mattress — 6×4.5ft Queen",
    description: `Sleep better every night with the Morning Glory Orthopedic Foam Mattress. Designed specifically for Nigerian climates and sleeping habits.

KEY FEATURES:
• 6 ft × 4.5 ft Queen size — fits standard Nigerian bed frames
• High-density orthopedic foam — firm support for spine alignment
• Breathable stretch knit fabric — stays cool and comfortable all night
• Anti-dust mite and anti-bacterial treatment
• 10 cm thickness — substantial cushioning without sagging
• Medium-firm feel — ideal for back and side sleepers
• Compression-rolled for easy delivery and setup

SPECIFICATIONS:
• Size: 6 ft × 4.5 ft (183 cm × 137 cm)
• Thickness: 10 cm
• Foam density: High-density orthopedic
• Cover: Stretch knit, removable and washable
• Treatment: Anti-dust mite, anti-bacterial

COMES WITH: Mattress, carry bag. 2-year manufacturer warranty.`,
    priceKobo: 4_500_000,
    category: "Home & Office",
    stock: 25,
    imageUrl: IMG.mattress1,
    images: [
      IMG.mattress1,
      IMG.mattress2,
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

SPECIFICATIONS:
• Screen size: 43 inches
• Resolution: 4K UHD (3840 × 2160)
• Panel: IPS
• HDR: HDR10, HLG
• Sound: 20W 2.0 ch, Dolby Audio
• Ports: 3× HDMI, 2× USB, Optical, LAN
• Connectivity: Wi-Fi 5, Bluetooth 5.0
• OS: webOS 6.0
• Energy consumption: 100W typical

IN THE BOX: TV, magic remote, power cable, stand, user manual.`,
    priceKobo: 7_000_000,
    category: "Electronics",
    stock: 10,
    imageUrl: IMG.tv,
    images: [
      IMG.tv,
    ],
  },
  {
    name: "Hisense 55\" QLED 4K Smart TV — 55U6K",
    description: `Experience cinema-quality visuals at home with the Hisense 55-inch QLED 4K Smart TV. Hisense Quantum Dot technology delivers over a billion colours.

KEY FEATURES:
• 55-inch QLED Quantum Dot display — 100% DCI-P3 colour gamut
• 4K UHD resolution with Dolby Vision HDR
• Hi-View Engine Pro — AI-powered picture upscaling
• VIDAA Smart OS — fast, simple, loaded with streaming apps
• Dolby Atmos 3D surround sound (30W)
• Game Mode Pro — 4K@144Hz, VRR, ALLM support
• 4× HDMI 2.1, 3× USB, Wi-Fi 6, Bluetooth 5.1
• Hands-free voice control

SPECIFICATIONS:
• Screen size: 55 inches
• Resolution: 4K UHD (3840 × 2160)
• Panel: QLED Quantum Dot
• HDR: Dolby Vision, HDR10+, HLG
• Sound: 30W 2.0 ch, Dolby Atmos
• Ports: 4× HDMI 2.1, 3× USB, ARC, eARC
• Connectivity: Wi-Fi 6, Bluetooth 5.1
• Refresh rate: 144Hz (VRR, ALLM)
• OS: VIDAA U6

IN THE BOX: TV, remote, stand, power cable, user manual.`,
    priceKobo: 12_000_000,
    category: "Electronics",
    stock: 8,
    // Use a distinct Unsplash ID for Hisense so it doesn't conflict with LG's primary
    imageUrl: U("1504450758481-7338eba7524a"),
    images: [
      U("1504450758481-7338eba7524a"),  // confirmed 200 — display/screen context
      IMG.tv,                            // supplemental: smart TV interface
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

SPECIFICATIONS:
• Output power: 80W (2 × 20W tweeters + 2 × 20W woofers)
• Frequency response: 50Hz – 20kHz
• Bluetooth: 5.3
• Waterproof: IPX7
• Battery: 6,600 mAh → 20 hrs playtime
• Charge: USB-C, 5 hr full charge
• Dimensions: 46.1 cm × 12 cm × 12.3 cm
• Weight: 2.95 kg

IN THE BOX: Speaker, USB-C cable, user manual.`,
    priceKobo: 3_500_000,
    category: "Electronics",
    stock: 30,
    imageUrl: IMG.speaker1,
    images: [
      IMG.speaker1,
      IMG.speaker2,
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

SPECIFICATIONS:
• Display: 6.78-inch AMOLED, 144Hz, 1300 nits peak
• Processor: MediaTek Dimensity 8200
• RAM: 8GB LPDDR5
• Storage: 256GB UFS 3.1
• Rear cameras: 50MP f/1.9 (OIS) + 50MP periscope 5× + 12MP ultrawide
• Front camera: 32MP
• Battery: 5000mAh + 70W fast charge
• OS: Android 14 / HiOS 14
• Connectivity: 5G, Wi-Fi 6E, Bluetooth 5.3, NFC

IN THE BOX: Phone, 70W charger, USB-C cable, case, screen protector.`,
    priceKobo: 14_000_000,
    category: "Phones & Tablets",
    stock: 20,
    imageUrl: IMG.phone_dark,  // Tecno: dark-angled phone as unique primary
    images: [
      IMG.phone_dark,
      IMG.phone_mid,
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

SPECIFICATIONS:
• Display: 6.6-inch Super AMOLED, 120Hz, 1000 nits
• Processor: Exynos 1480 (4nm)
• RAM: 8GB
• Storage: 128GB (microSD up to 1TB)
• Rear cameras: 50MP f/1.8 OIS + 12MP ultrawide + 5MP macro
• Front camera: 32MP
• Battery: 5000mAh + 25W
• IP rating: IP67
• OS: Android 14 / One UI 6.1

IN THE BOX: Phone, 25W charger, USB-C cable, SIM tool.`,
    priceKobo: 11_000_000,
    category: "Phones & Tablets",
    stock: 25,
    imageUrl: IMG.phone_table,  // Samsung: phone-on-table as unique primary
    images: [
      IMG.phone_table,
      IMG.phone_white,
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

SPECIFICATIONS:
• Display: 6.78-inch AMOLED, 120Hz
• Processor: MediaTek Helio G100
• RAM: 8GB
• Storage: 256GB (expandable)
• Rear cameras: 108MP main + 2MP depth + AI lens
• Front camera: 16MP dual flash
• Battery: 5000mAh + 45W fast charge
• OS: Android 14 / XOS 14
• Connectivity: 4G LTE, Wi-Fi 5, Bluetooth 5.0

IN THE BOX: Phone, 45W charger, USB-C cable, protective case.`,
    priceKobo: 8_500_000,
    category: "Phones & Tablets",
    stock: 35,
    imageUrl: IMG.phone_white,  // Infinix: white-bg phone as unique primary
    images: [
      IMG.phone_white,
      IMG.phone_dark,
    ],
  },
  {
    name: "Apple iPad 10th Gen — 64GB Wi-Fi Silver",
    description: `The iPad 10th generation brings a complete redesign with a larger display, powerful A14 chip, and an all-day battery.

KEY FEATURES:
• 10.9-inch Liquid Retina display — True Tone, 500 nits
• A14 Bionic chip — faster than most laptops
• 12MP wide rear camera, 12MP ultrawide front camera with Centre Stage
• USB-C connector with 5 Gbps data transfer
• Wi-Fi 6, Bluetooth 5.2
• 64GB storage — plenty for apps, photos, and videos
• All-day 28-hour battery life
• iPadOS 17 — multitasking, collaboration, productivity

SPECIFICATIONS:
• Display: 10.9-inch Liquid Retina, 2360 × 1640, 264 ppi, True Tone
• Chip: Apple A14 Bionic
• Storage: 64GB
• Camera (rear): 12MP wide, f/1.8
• Camera (front): 12MP ultrawide, Centre Stage
• Connectivity: Wi-Fi 6 (802.11ax), Bluetooth 5.2, USB-C
• Battery: Up to 10 hrs (usage) / 28 hrs (video)
• Dimensions: 248.6 × 179.5 × 7 mm
• Weight: 477 g

COMPATIBLE WITH: Apple Pencil (1st gen), Magic Keyboard Folio.

IN THE BOX: iPad, USB-C charge cable, USB-C 20W power adapter.`,
    priceKobo: 28_000_000,
    category: "Phones & Tablets",
    stock: 10,
    // Apple CDN: confirmed in proxy allowlist (store.storeimages.cdn-apple.com)
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-silver-wifi_FMT_WHH",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-silver-wifi_FMT_WHH",
    ],
  },

  // ── Computing ────────────────────────────────────────────────────────────────
  {
    name: "HP 15s-eq3000 Laptop — Ryzen 5 / 8GB / 512GB SSD",
    description: `Slim, fast, and built for work — the HP 15s is the go-to laptop for Nigerian students, professionals, and entrepreneurs.

KEY FEATURES:
• 15.6-inch FHD IPS display — anti-glare, micro-edge bezels
• AMD Ryzen 5 5500U — 6 cores, 12 threads, up to 4.0GHz boost
• 8GB DDR4-3200 RAM — smooth multitasking, upgradeable to 16GB
• 512GB PCIe NVMe M.2 SSD — boots in under 10 seconds
• AMD Radeon integrated graphics — handles everyday media and light editing
• HP Fast Charge — 50% battery in 45 minutes
• Wi-Fi 5 (2×2 AC), Bluetooth 4.2
• Ports: USB-A×2, USB-C, HDMI 1.4b, headphone/mic combo
• Windows 11 Home — pre-installed and activated
• Up to 8.5 hours mixed-use battery life
• Weight: 1.75 kg — easy to carry to lectures and meetings

SPECIFICATIONS:
• Display: 15.6-inch FHD (1920×1080) IPS anti-glare
• Processor: AMD Ryzen 5 5500U (6C/12T, up to 4.0GHz)
• RAM: 8GB DDR4-3200 (1 DIMM, 1 free slot)
• Storage: 512GB PCIe NVMe M.2 SSD
• Graphics: AMD Radeon Graphics (integrated)
• Battery: 41Wh 3-cell; HP Fast Charge
• OS: Windows 11 Home (64-bit)
• Colour: Natural Silver

IN THE BOX: HP 15s Laptop, 65W USB-C slim power adapter, documentation.`,
    priceKobo: 38_000_000,
    category: "Computing",
    stock: 12,
    imageUrl: IMG.laptop1,  // HP: open laptop side-angle as unique primary
    images: [
      IMG.laptop1,
      IMG.laptop5,
      IMG.laptop4,
    ],
  },
  {
    name: "Lenovo IdeaPad Slim 3 — Intel Core i5 / 16GB / 512GB SSD",
    description: `The Lenovo IdeaPad Slim 3 is a powerhouse thin-and-light laptop perfect for everyday computing, video calls, and light creative work.

KEY FEATURES:
• 15.6-inch FHD IPS display — 300 nits, TÜV Rheinland Low Blue Light certified, anti-glare
• Intel Core i5-1235U — 10 cores (2P + 8E), up to 4.4GHz boost, 12th Gen
• 16GB LPDDR5-4800 RAM — effortless multitasking, multiple browser tabs, video calls
• 512GB M.2 2242 PCIe NVMe SSD — fast, silent, no moving parts
• Intel Iris Xe integrated graphics — crisp visuals, light photo editing, 4K video playback
• Wi-Fi 6 (802.11ax), Bluetooth 5.1
• Ports: USB-A 3.2 Gen 1, USB-A 2.0, USB-C with Power Delivery, HDMI 1.4, 3.5mm combo
• Microsoft Office 2021 Home & Student — pre-installed and licensed
• Windows 11 Home — pre-installed and activated
• Up to 9 hours battery life (65Wh); Rapid Charge: 0→80% in ~1 hour
• Weight: 1.62 kg — ultraportable for commutes and campus

SPECIFICATIONS:
• Display: 15.6-inch FHD (1920×1080) IPS, 300 nits, Low Blue Light TÜV
• Processor: Intel Core i5-1235U 12th Gen (10C, up to 4.4GHz)
• RAM: 16GB LPDDR5-4800 (soldered)
• Storage: 512GB M.2 PCIe NVMe SSD
• Graphics: Intel Iris Xe (integrated)
• Battery: 65Wh 4-cell; Rapid Charge
• OS: Windows 11 Home + Microsoft Office 2021
• Colour: Arctic Grey

IN THE BOX: Lenovo IdeaPad Slim 3, 65W slim-tip AC adapter, documentation.`,
    priceKobo: 45_000_000,
    category: "Computing",
    stock: 10,
    imageUrl: IMG.laptop2,  // Lenovo: desk laptop as unique primary (different from HP)
    images: [
      IMG.laptop2,
      IMG.laptop3,
      IMG.laptop4,
    ],
  },
  {
    name: "Logitech MX Master 3S Wireless Mouse",
    description: `The gold standard for productivity — the Logitech MX Master 3S Wireless Mouse features ultra-fast scrolling, whisper-quiet clicks, and 8K DPI precision.

KEY FEATURES:
• 8000 DPI Darkfield sensor — works on any surface including glass
• MagSpeed electromagnetic scrolling — 1000 lines/second
• Quiet clicks — 90% quieter than standard mouse
• Connects to up to 3 devices via Bluetooth or USB receiver
• USB-C rechargeable — 3 hours charge = 70 days use
• Customisable 7 buttons with Logi Options+ software
• Ergonomic thumb rest — reduces wrist fatigue
• Works on Windows, macOS, Linux, Chrome OS, iPadOS

SPECIFICATIONS:
• Sensor: Darkfield high-precision, 200–8000 DPI
• Buttons: 7 customisable
• Scroll wheel: MagSpeed electromagnetic
• Connectivity: Bluetooth Low Energy + USB receiver (Logi Bolt)
• Battery: 500mAh internal; USB-C; 70 days per charge
• Compatibility: Windows 10+, macOS 11+, Linux, Chrome OS, iPadOS
• Dimensions: 124.9 × 84.3 × 51 mm
• Weight: 141 g (without receiver)

IN THE BOX: Mouse, USB-C cable, USB receiver.`,
    priceKobo: 2_800_000,
    category: "Computing",
    stock: 40,
    imageUrl: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
    images: [
      "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png",
      "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-side-view-graphite.png",
      "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-bottom-view-graphite.png",
    ],
  },

  // ── Fashion ──────────────────────────────────────────────────────────────────
  {
    name: "Men's Polo Ralph Lauren Classic Fit Polo Shirt",
    description: `The timeless Polo Ralph Lauren Classic Fit Polo Shirt — crafted in soft cotton piqué for comfort, style, and all-day wear.

KEY FEATURES:
• 100% combed soft cotton piqué fabric
• Classic fit — relaxed through chest, waist, and hips
• Three-button placket with signature embroidered Polo Pony
• Ribbed collar and sleeve cuffs
• Side vents for ease of movement
• Machine washable — stays fresh wash after wash
• Available in sizes S, M, L, XL, XXL

SPECIFICATIONS:
• Material: 100% cotton piqué
• Fit: Classic
• Collar: Ribbed polo collar
• Closure: 3-button placket
• Care: Machine wash cold, tumble dry low
• Sizes: S / M / L / XL / XXL

AVAILABLE COLOURS: White, Navy, Red, Black, Forest Green.

Perfect for office smart-casual, weekend outings, and events.`,
    priceKobo: 1_500_000,
    category: "Fashion",
    stock: 60,
    imageUrl: IMG.polo1,
    images: [
      IMG.polo1,
      IMG.polo2,
      IMG.polo3,
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

SPECIFICATIONS:
• Fabric: Premium Dutch wax print cotton
• Lining: 100% cotton
• Closure: Self-tie wrap
• Length: Midi (falls below knee)
• Care: Machine wash cold, hang to dry
• Sizes: S / M / L / XL / XXL / XXXL

STYLE TIPS: Pair with block heels or wedges for events; wear with sandals for casual outings.

Handcrafted in Lagos.`,
    priceKobo: 850_000,
    category: "Fashion",
    stock: 50,
    imageUrl: IMG.ankara,
    images: [
      IMG.ankara,
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

SPECIFICATIONS:
• Upper: Full-grain leather
• Midsole: Nike Air unit
• Outsole: Rubber with pivot circle
• Closure: Lace-up
• Sizes: UK 5 – UK 12 (half sizes available)
• Colour: White / White (Style: CW2288-111)

Originally designed for basketball, now the most popular street sneaker in the world.

IN THE BOX: Shoes (pair), extra laces, shoe bag.`,
    priceKobo: 6_500_000,
    category: "Fashion",
    stock: 30,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png",  // top/front view
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3fefc6c5-e8b6-4f3d-b2af-e287a6b475cb/air-force-1-07-mens-shoes-jBrhbr.png",  // side view
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/772da609-c608-4728-b7db-a6fafca0f23d/air-force-1-07-mens-shoes-jBrhbr.png",  // sole view
      IMG.shoe_lifestyle,  // lifestyle: sneaker on foot
      IMG.shoe_detail,     // detail close-up
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
• Dimensions: 38 cm × 28 cm × 14 cm

SPECIFICATIONS:
• Material: Full-grain cowhide leather
• Hardware: Gold-tone metal, tarnish-free
• Closure: Magnetic snap
• Straps: Fixed top handles + detachable crossbody (120 cm adjustable)
• Interior pockets: 2 open + 1 zip
• Exterior pockets: 1 rear zip
• Dimensions: 38 × 28 × 14 cm
• Weight: ~700 g (empty)

Available in: Tan Brown, Black, Burgundy.

Handcrafted. Each bag is uniquely yours.`,
    priceKobo: 3_200_000,
    category: "Fashion",
    stock: 25,
    imageUrl: IMG.bag,
    images: [
      IMG.bag,
      IMG.shoe_lifestyle, // lifestyle: fashion/accessories context
    ],
  },

  // ── Supermarket ──────────────────────────────────────────────────────────────
  {
    name: "Dangote Sugar Refinery — 50kg Bag Granulated Sugar",
    description: `Premium quality Dangote refined sugar — Nigeria's most trusted household staple for cooking, baking, and beverages.

KEY FEATURES:
• 50 kg net weight — bulk-buy savings for families and businesses
• Fine granulated sugar — dissolves instantly, no clumping
• Made in Nigeria — fresh from Dangote refinery
• NAFDAC approved
• Best for: tea, baking, soft drinks, cooking, confectionery

SPECIFICATIONS:
• Net weight: 50 kg
• Type: Fine granulated white sugar
• Origin: Made in Nigeria (Dangote Refinery)
• Approval: NAFDAC certified
• Shelf life: 24 months (unopened)
• Packaging: Woven polypropylene sack

STORAGE: Store in a cool, dry place. Once opened, transfer to an airtight container.`,
    priceKobo: 800_000,
    category: "Supermarket",
    stock: 100,
    imageUrl: IMG.grain,
    images: [
      IMG.grain,
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

SPECIFICATIONS:
• Pack contents: 3 × 400g tins
• Key nutrients: Calcium, Vitamin D, Iron, Vitamins B1/B2/B3/B12
• Serving: 3 heaped teaspoons (20g) per 200ml warm milk
• Shelf life: 24 months from manufacture
• Manufacturer: Nestlé Nigeria PLC

SERVING SUGGESTION: 3 heaped teaspoons in warm milk. Add sugar to taste.`,
    priceKobo: 650_000,
    category: "Supermarket",
    stock: 150,
    imageUrl: IMG.tin_drink,
    images: [
      IMG.tin_drink,
      IMG.cocoa,
      IMG.choc_drink,
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

SPECIFICATIONS:
• Pack contents: 40 × 70g packs
• Flavour: Chicken
• Preparation time: 3 minutes (boil/fry)
• Fortification: Vitamins A, B1, B2, B3, iron
• Certifications: NAFDAC, Halal
• Manufacturer: Dufil Prima Foods Ltd, Nigeria
• Shelf life: 12 months from manufacture

SERVING IDEAS: Boiled with egg, fried with vegetables, with sardines.`,
    priceKobo: 320_000,
    category: "Supermarket",
    stock: 200,
    imageUrl: IMG.noodles1,
    images: [
      IMG.noodles1,
      IMG.noodles2,
    ],
  },

  // ── Kitchen & Dining ─────────────────────────────────────────────────────────
  {
    name: "Scanfrost 5-Burner Gas Cooker with Oven — SFCK5500",
    description: `The Scanfrost 5-Burner Gas Cooker with Oven is a robust, high-capacity cooker that handles the demands of the Nigerian kitchen — big pots, strong flames, and a full oven.

KEY FEATURES:
• 5 gas burners — 1 triple ring wok burner + 4 standard burners
• Full-size oven with grill — 80-litre capacity
• Tempered glass lid and oven door
• Automatic ignition — no matches needed
• Cast iron pan supports — stable even for large pots
• Flame failure safety device — gas cuts off automatically
• Stainless steel body — easy to clean, rust-resistant
• LPG compatible (Abuja gas, Blue gas, Cooks gas)

SPECIFICATIONS:
• Burners: 5 (1 triple ring wok + 4 standard)
• Oven capacity: 80 litres with grill
• Ignition: Automatic electric ignition
• Pan supports: Enamelled cast iron
• Gas type: LPG
• Dimensions: 90 cm × 60 cm × 87 cm (H×W×D)
• Body: Stainless steel

IN THE BOX: Cooker, grill pan, 2 oven trays, LPG hose, user manual.`,
    priceKobo: 18_000_000,
    category: "Kitchen & Dining",
    stock: 8,
    imageUrl: IMG.stove,  // Scanfrost: cooking on gas stove as unique primary
    images: [
      IMG.stove,
      IMG.pot,
    ],
  },
  {
    name: "Stainless Steel Cookware Set — 8 Pieces",
    description: `A complete cookware set for the modern Nigerian kitchen — stainless steel construction, compatible with all cookers including induction.

WHAT'S IN THE SET (8 pieces):
• 16 cm saucepan with lid
• 20 cm saucepan with lid
• 24 cm casserole pot with lid
• 24 cm non-stick frying pan
• Stainless steel steamer insert

KEY FEATURES:
• 18/10 stainless steel — food-safe, non-reactive, rust-proof
• Tri-ply base — even heat distribution, no hot spots
• Stay-cool riveted handles — oven-safe to 200°C
• Dishwasher safe
• Compatible with gas, electric, ceramic, and induction cookers

SPECIFICATIONS:
• Material: 18/10 stainless steel, tri-ply base
• Pieces: 8 (4 pots + 4 lids + 1 frying pan + 1 steamer)
• Max oven temp: 200°C
• Induction compatible: Yes
• Dishwasher safe: Yes

Perfect starter set for new homes, newlyweds, and kitchen upgrades.`,
    priceKobo: 2_500_000,
    category: "Kitchen & Dining",
    stock: 35,
    imageUrl: IMG.pot,  // Cookware: cast iron pot as unique primary
    images: [
      IMG.pot,
      IMG.stove,
      IMG.kitchen_appl,
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

SPECIFICATIONS:
• Capacity: 1.5 litres (hardened glass)
• Motor: 400W
• Blades: 4-wing stainless steel
• Speeds: 2 + pulse
• Voltage: 220–240V / 50Hz
• Base: Anti-slip suction cup feet

IDEAL FOR: Pepper, tomatoes, smoothies, egusi grinding, nuts, ice crushing.

IN THE BOX: Blender base, glass jar, lid, user manual.`,
    priceKobo: 900_000,
    category: "Kitchen & Dining",
    stock: 50,
    imageUrl: IMG.kitchen_appl,  // Binatone: kitchen counter appliances as unique primary
    images: [
      IMG.kitchen_appl,
      IMG.pot,
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

SPECIFICATIONS:
• Volume: 50ml
• Key ingredient: Hyaluronic acid
• Skin type: All (including sensitive, oily, combination)
• Fragrance: Free
• Paraben: Free
• Tested: Dermatologist-tested, non-comedogenic
• SPF: None (use a separate SPF for day use)

SUITABLE FOR: Normal, oily, combination, and dry skin types.

HOW TO USE: Apply a generous amount to cleansed face morning and night.`,
    priceKobo: 450_000,
    category: "Health & Beauty",
    stock: 80,
    imageUrl: IMG.skincare1,
    images: [
      IMG.skincare1,
      IMG.skincare2,
      IMG.skincare3,
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

SPECIFICATIONS:
• Variants: Normal (fine/medium texture) / Super (coarse/resistant)
• Key ingredient: Olive oil extract
• pH: Balanced for scalp safety
• Paraben: Free
• Kit contents: Relaxer cream, neutralising shampoo, conditioner, gloves
• Certification: NAFDAC approved

HOW TO USE: Follow included step-by-step instruction card. Patch test 48 hrs before use.`,
    priceKobo: 380_000,
    category: "Health & Beauty",
    stock: 100,
    imageUrl: IMG.hair1,
    images: [
      IMG.hair1,
      IMG.hair2,
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

SPECIFICATIONS:
• Tweezers: 20
• Min. hair length: 0.5mm
• Speeds: 2
• Power: Corded + cordless (NiMH battery)
• Charging: 1 hr full charge → 30 min cordless use
• Attachments: Massage cap, efficiency cap
• Waterproof head: Yes (washable)

AREAS: Legs, underarms, bikini line, arms. For external use only.

IN THE BOX: Epilator, massage cap, efficiency cap, charging cord.`,
    priceKobo: 1_800_000,
    category: "Health & Beauty",
    stock: 45,
    imageUrl: IMG.epilator,
    images: [
      IMG.epilator,
      IMG.skincare3,
      IMG.skincare2,
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

SPECIFICATIONS:
• Total weight: 20 kg
• Bar diameter: 25 mm chrome steel (knurled)
• Plates: 4 × 1.25 kg, 4 × 2.5 kg, 4 × 5 kg (rubber-coated)
• Collar: Spin-lock
• Bars included: 2

INCLUDES: 2 chrome bars + 12 rubber weight plates + 4 spin-lock collars.`,
    priceKobo: 4_500_000,
    category: "Sporting Goods",
    stock: 20,
    imageUrl: IMG.dumbbells,
    images: [
      IMG.dumbbells,
      IMG.gym,
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

SPECIFICATIONS:
• Upper: Integrated knit with Grip-Tex texture
• Outsole: FG/MG (firm ground / multi-ground)
• Stud type: Conical + bladed hybrid
• Sizes: UK 6 – UK 12
• Insole: Removable cushioned insole

Compatible with: Natural grass, artificial grass (4G & 5G), dry hard ground.

IN THE BOX: Boots (pair), laces, boot bag.`,
    priceKobo: 5_500_000,
    category: "Sporting Goods",
    stock: 25,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3cb66f21-dae0-4e34-9f54-c4e71c5b4d81/phantom-gx-academy-fg-mg-football-boots-pslL3R.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3cb66f21-dae0-4e34-9f54-c4e71c5b4d81/phantom-gx-academy-fg-mg-football-boots-pslL3R.png",
      IMG.shoe_lifestyle,
      IMG.shoe_detail,
    ],
  },

  // ── Baby Products ────────────────────────────────────────────────────────────
  {
    name: "Pampers Premium Care Diapers — Size 4 (9–14kg) × 52 Count",
    description: `Pampers Premium Care — the softest diaper for your baby's most sensitive skin. Trusted by Nigerian mums for decades.

KEY FEATURES:
• Size 4 — fits babies 9–14 kg (typically 4–18 months)
• 52 diapers per pack — great value
• SkinLove™ lotion with shea butter — moisturises with every use
• 360° softness — softer than cotton on all sides
• Airloc™ channels — lock away wetness and odour for up to 12 hours
• Ultra-dry core — keeps baby's skin dry and comfortable
• Flexible waistband — moves with baby, no marks
• DERMATOLOGICALLY tested, paediatrician recommended

SPECIFICATIONS:
• Size: 4 (9–14 kg / ~4–18 months)
• Count: 52 diapers per pack
• Core: Ultra-dry with Airloc™ channels
• Lotion: SkinLove™ with shea butter
• Tested: Dermatologically tested, paediatrician recommended
• Certifications: NAFDAC approved

NAFDAC approved. Imported.`,
    priceKobo: 850_000,
    category: "Baby Products",
    stock: 120,
    imageUrl: IMG.diapers,
    images: [
      IMG.diapers,
      IMG.baby3,
      IMG.baby1,
    ],
  },
  {
    name: "Baby Trend Expedition Jogger Travel System — Stroller + Infant Car Seat",
    description: `Everything you need to travel with your newborn — the Baby Trend Expedition Jogger Travel System includes a jogger stroller and compatible infant car seat.

KEY FEATURES:
• Jogger stroller with air-filled tyres — smooth ride on all terrains
• EZlocK™ buckle — one-hand attachment of car seat to stroller
• Flex-Loc infant car seat — fits babies 2.3–16 kg
• 5-point harness with EPS energy-absorbing foam — maximum safety
• Parent tray with two cup holders and storage
• Extra-large storage basket underneath stroller
• Rear-wheel disc brakes — reliable stopping power
• Adjustable canopy — UV50+ sun protection
• Folds compactly for car boot storage

SPECIFICATIONS:
• Car seat weight range: 2.3 – 16 kg
• Harness: 5-point adjustable
• Tyre type: Air-filled (pneumatic) rubber
• Canopy: Multi-position adjustable, UPF 50+
• Stroller weight: 13.6 kg (with car seat)
• Fold type: Single-hand fold
• Certifications: FMVSS 213

SAFETY CERTIFIED: FMVSS 213, tested to exceed US federal standards.`,
    priceKobo: 12_000_000,
    category: "Baby Products",
    stock: 6,
    imageUrl: IMG.stroller,
    images: [
      IMG.stroller,
      IMG.baby2,
      IMG.diapers,
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

SPECIFICATIONS:
• Age range: Newborn – 36 months
• Stages: 5 (newborn, sit-and-play, stand, toddler piano, floor piano)
• Piano keys: Light-up with 70+ sounds/songs/phrases
• Mat: Soft padded, machine-washable
• Batteries: 3 × AA (included)
• Dimensions (unfolded): 84 × 56 cm

DEVELOPMENTAL BENEFITS: Sensory exploration, motor skills, music and language.

Machine-washable mat.`,
    priceKobo: 1_600_000,
    category: "Baby Products",
    stock: 20,
    imageUrl: IMG.baby1,
    images: [
      IMG.baby1,
      IMG.baby2,
      IMG.baby3,
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

  console.log(`✅  Inserted/updated ${inserted.length} products:`);
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
