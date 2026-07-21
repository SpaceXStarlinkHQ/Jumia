/**
 * Seed script — populates the store with 20 initial products (3 images each).
 * Run with: pnpm --filter @workspace/db run seed
 *
 * Prices are the 80%-off PROMO prices stored in kobo.
 * Original (strikethrough) prices are computed by the frontend from the discount %.
 */
import { db, productsTable } from "./index.js";

const products = [
  // ── Phones & Tablets ────────────────────────────────────────────────────────
  {
    name: "Tecno Camon 40 Pro 5G — 256GB/16GB RAM",
    description:
      `Experience next-level photography and performance with the Tecno Camon 40 Pro 5G. Featuring a stunning 6.78" AMOLED curved display with 144Hz refresh rate, this powerhouse smartphone delivers silky-smooth scrolling and vivid visuals that bring every frame to life.

KEY FEATURES:
• 50MP OIS Main Camera + 50MP Front Camera — capture razor-sharp portraits and cinematic selfies even in low light
• 5G-ready MediaTek Dimensity 8020 processor — blazing fast app launches and seamless multitasking
• 16GB RAM + 256GB internal storage (expandable to 1TB via microSD)
• 5000mAh battery with 45W Flash Charge — go from 0 to 70% in just 30 minutes
• 144Hz AMOLED curved display — immersive viewing experience for gaming and streaming
• Android 14 with HiOS 14 — clean, intuitive interface packed with smart AI features
• IP54 splash resistance — peace of mind in light rain or kitchen splashes
• Available in: Midnight Black, Aurora Green, Stellar White

IN THE BOX:
Tecno Camon 40 Pro 5G, 45W charger, USB-C cable, protective case, screen protector, SIM ejector pin, user manual.`,
    priceKobo: 18_900_000,
    category: "Phones & Tablets",
    stock: 47,
    imageUrl: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=600&q=80",
      "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=600&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
    ],
  },
  {
    name: "Samsung Galaxy A55 5G — 128GB/8GB RAM",
    description:
      `The Samsung Galaxy A55 5G redefines mid-range excellence with a premium glass-and-metal design that looks and feels flagship-class. Its triple-camera system and brilliant Super AMOLED display make it the ultimate everyday companion.

KEY FEATURES:
• 50MP Main + 12MP Ultra-Wide + 5MP Macro triple camera system — versatile photography for every scene
• 6.6" Super AMOLED display, 120Hz — smooth, bright, and beautiful with peak 1000 nits brightness
• Exynos 1480 octa-core processor — efficient and powerful for streaming, gaming, and social media
• 8GB RAM + 128GB storage (expandable up to 1TB)
• 5000mAh battery + 25W fast charging
• IP67 water and dust resistance — fully protected up to 1 metre for 30 minutes
• Samsung Knox security — enterprise-grade protection for your data
• 5 years of OS updates guaranteed — a phone that grows with you
• Available in: Awesome Iceblue, Awesome Navy, Awesome Lilac

IN THE BOX:
Samsung Galaxy A55 5G, 25W adapter, USB-C cable, protective case, SIM ejector tool.`,
    priceKobo: 28_500_000,
    category: "Phones & Tablets",
    stock: 32,
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80",
    ],
  },
  {
    name: "Apple iPhone 15 — 128GB (Unlocked)",
    description:
      `The iPhone 15 is a masterclass in refined engineering. With the Dynamic Island, a 48MP main camera, and the powerful A16 Bionic chip, it delivers a premium experience that is instantly recognizable and endlessly capable.

KEY FEATURES:
• 48MP Main Camera with 2x optical-quality zoom — professional-level photography in your pocket
• Dynamic Island — an elegant, interactive way to see alerts, Live Activities, and more
• A16 Bionic chip — the most powerful chip in any smartphone in its class
• Super Retina XDR OLED display, 6.1 inches, 60Hz — stunning colour accuracy and deep blacks
• USB-C connectivity — universal charging and fastest-ever data transfer for iPhone
• All-day battery life + MagSafe wireless charging
• Ceramic Shield front, colour-infused matte back glass — beautiful and durable
• iOS 17 with Crash Detection and Emergency SOS via satellite
• Available in: Pink, Yellow, Green, Blue, Black

IN THE BOX:
iPhone 15, USB-C cable, documentation.`,
    priceKobo: 69_900_000,
    category: "Phones & Tablets",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&q=80",
      "https://images.unsplash.com/photo-1695048133142-1a20484429be?w=600&q=80",
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600&q=80",
    ],
  },
  {
    name: "Infinix Zero 40 5G — 256GB/12GB RAM",
    description:
      `Built for creators and gamers alike, the Infinix Zero 40 5G packs a cinema-grade 50MP portrait camera, a buttery-smooth 144Hz AMOLED display, and a beastly Dimensity 8200 Ultimate chip — all wrapped in an ultra-slim glass body.

KEY FEATURES:
• 50MP Sony IMX890 OIS camera + 50MP front camera with 4K video
• 6.78" AMOLED 144Hz curved display — gorgeous visuals for gaming and content creation
• Dimensity 8200 Ultimate chipset + 12GB RAM (expandable via RAM fusion)
• 256GB UFS 3.1 storage — fast read/write speeds for heavy workloads
• 5000mAh battery + 68W All-Round Fast Charge
• 5G ready — future-proof connectivity on all major networks
• XOS 14 based on Android 14
• Dual stereo speakers with Dolby Atmos tuning

IN THE BOX:
Infinix Zero 40 5G, 68W charger, USB-C cable, protective case, screen guard.`,
    priceKobo: 16_500_000,
    category: "Phones & Tablets",
    stock: 55,
    imageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80",
      "https://images.unsplash.com/photo-1571768074922-8627b1f77a31?w=600&q=80",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=80",
    ],
  },
  {
    name: "Apple iPad 10th Generation — 64GB WiFi",
    description:
      `The all-new iPad with the A14 Bionic chip and a 10.9-inch Liquid Retina display brings a redesigned, all-screen experience to the most popular iPad ever.

KEY FEATURES:
• 10.9" Liquid Retina display — vivid, True Tone, fully laminated with anti-reflective coating
• A14 Bionic chip — powerful enough for the most demanding apps and games
• 12MP front camera in landscape for crisp video calls — perfect for remote learning
• 12MP rear camera — shoot steady, beautiful photos and 4K video
• USB-C connectivity + WiFi 6 for lightning-fast wireless performance
• Touch ID fingerprint sensor built into the side button
• All-day battery life — up to 10 hours of web surfing on WiFi
• Available in: Blue, Pink, Yellow, Silver
• iPadOS 17 — multitask with Stage Manager, draw with Apple Pencil (1st gen)

IN THE BOX:
iPad, USB-C cable, USB-C power adapter, documentation.`,
    priceKobo: 38_500_000,
    category: "Phones & Tablets",
    stock: 24,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80",
      "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=600&q=80",
    ],
  },

  // ── Electronics ─────────────────────────────────────────────────────────────
  {
    name: "Samsung 55\" 4K QLED Smart TV — QE55Q70C",
    description:
      `Transform your living room into a cinematic haven with the Samsung 55" QLED Smart TV. Quantum Dot technology delivers over a billion shades of brilliant colour, while the 4K AI Upscaling processor makes every source look its absolute best.

KEY FEATURES:
• Quantum Dot colour technology — 100% Colour Volume for accurate, vivid colours at any brightness
• 4K AI Upscaling — intelligent upscaling transforms HD content to near-4K quality in real time
• Motion Xcelerator Turbo+ — 120Hz refresh rate and VRR for ultra-smooth gaming
• Object Tracking Sound+ — audio that moves with the on-screen action
• Smart TV with Tizen OS — seamless access to Netflix, YouTube, DSTV, Prime Video
• HDMI 2.1 ports — ideal for PS5, Xbox Series X, and 4K Blu-ray
• Gaming Hub — find and stream console games without a console

IN THE BOX:
Samsung QLED TV (55"), remote control, power cable, stand/legs, wall-mount template, batteries, user manual.`,
    priceKobo: 52_000_000,
    category: "Electronics",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80",
    ],
  },
  {
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    description:
      `The Sony WH-1000XM5 is the undisputed king of wireless noise cancellation. Eight microphones and two processors work in perfect harmony to block out virtually all ambient sound so you can focus on what matters — your music.

KEY FEATURES:
• Industry-leading noise cancellation — 8 microphones + Integrated Processor V1
• Exceptional 30-hour battery life with Quick Charge (3 mins = 3 hours playback)
• Crystal-clear hands-free calling — 4 beamforming microphones capture your voice precisely
• Hi-Res Audio Wireless with LDAC — enjoy studio-quality audio wirelessly
• Ultra-soft leather ear cushions and redesigned headband — all-day comfort
• Speak-to-Chat technology — automatically pauses music when you start speaking
• Multipoint connection — seamlessly switch between two Bluetooth devices

IN THE BOX:
WH-1000XM5 headphones, USB-C charging cable, 3.5mm audio cable, carry case, flight adapter.`,
    priceKobo: 14_500_000,
    category: "Electronics",
    stock: 38,
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
    ],
  },
  {
    name: "JBL Flip 6 Portable Bluetooth Speaker",
    description:
      `The JBL Flip 6 is a portable Bluetooth speaker that delivers surprisingly powerful sound with clear highs and deep bass. Wherever the party is, Flip 6 keeps it going.

KEY FEATURES:
• Powerful JBL Pro Sound — dual-speaker system with a separate tweeter for balanced audio
• IP67 waterproof and dustproof — take it to the pool, beach, or shower without worry
• 12-hour battery life — full day of uninterrupted music playback
• PartyBoost — link multiple JBL speakers wirelessly to amplify the party
• USB-C charging — convenient and universal charging
• Available in: Black, Blue, Red, Teal, Squad (Camo)

IN THE BOX:
JBL Flip 6 speaker, USB-C charging cable, safety sheet, quick start guide.`,
    priceKobo: 5_800_000,
    category: "Electronics",
    stock: 62,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=600&q=80",
    ],
  },
  {
    name: "Samsung Galaxy Watch 6 Classic — 47mm",
    description:
      `The Samsung Galaxy Watch 6 Classic brings back the iconic rotating bezel, now reimagined in sapphire crystal glass. Packed with advanced health sensors and up to 40 hours of battery life, it is the most complete smartwatch Samsung has ever made.

KEY FEATURES:
• Physical rotating bezel — intuitive navigation and a satisfying tactile experience
• Advanced health monitoring — body composition, sleep coaching, ECG, blood pressure
• 40-hour battery life — wear through the day and sleep without charging
• Sapphire Crystal Glass — ultra-scratch resistant for lasting clarity
• Wear OS 4 + One UI Watch 5 — smoother, smarter, more customisable
• Samsung BioActive Sensor — tracks SpO2, stress, heart rate, and skin temperature
• 5ATM + IP68 waterproof — safe for swimming and showering

IN THE BOX:
Galaxy Watch 6 Classic, wireless charger, quick start guide.`,
    priceKobo: 9_800_000,
    category: "Electronics",
    stock: 29,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ebb6956?w=600&q=80",
    ],
  },
  {
    name: "Hisense 43\" Full HD Smart TV — 43A4K",
    description:
      `Great picture quality and smart connectivity at an unbeatable price — that is the Hisense 43A4K. With built-in VIDAA Smart OS, you get instant access to all your favourite streaming apps on a crisp Full HD screen.

KEY FEATURES:
• 43" Full HD (1920x1080) LED display — sharp and detailed visuals for any room size
• VIDAA Smart OS — pre-loaded Netflix, YouTube, Prime Video, Disney+, and more
• DTS Virtual X Audio — immersive surround sound experience from built-in speakers
• Dolby Vision and HDR10 support — enhanced colour and contrast
• Voice remote included — control your TV with just your voice
• 2x HDMI + 2x USB ports — connect all your devices with ease
• Energy-saving Auto Backlight Control

IN THE BOX:
Hisense TV (43"), remote control, stand, power cable, user manual, batteries.`,
    priceKobo: 12_500_000,
    category: "Electronics",
    stock: 41,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=600&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
      "https://images.unsplash.com/photo-1615863836843-f6c00cf61f43?w=600&q=80",
    ],
  },

  // ── Computing ────────────────────────────────────────────────────────────────
  {
    name: "HP Pavilion 15 Laptop — Intel Core i7, 16GB RAM, 512GB SSD",
    description:
      `The HP Pavilion 15 combines everyday performance with a sleek profile and a brilliant display, making it the ideal laptop for students, professionals, and creatives who demand more from their machine without breaking the bank.

KEY FEATURES:
• 12th Gen Intel Core i7-1255U processor (10 cores, up to 4.7GHz Turbo)
• 16GB DDR4 RAM — effortless multitasking across dozens of apps and browser tabs
• 512GB PCIe NVMe SSD — near-instant boot and app launch times
• 15.6" FHD IPS micro-edge display — anti-glare, 250-nit brightness for comfortable all-day use
• Intel Iris Xe Graphics — capable of light photo/video editing and casual gaming
• Wi-Fi 6 (802.11ax) + Bluetooth 5.2 — fast, reliable wireless connectivity
• Backlit keyboard with numeric pad
• Bang & Olufsen dual speakers with HP Audio Boost
• Up to 8 hours battery life
• Windows 11 Home pre-installed

IN THE BOX:
HP Pavilion 15 laptop, 65W USB-C power adapter, user documentation.`,
    priceKobo: 32_000_000,
    category: "Computing",
    stock: 19,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    ],
  },
  {
    name: "Dell Inspiron 15 3000 — Intel Core i5, 8GB, 256GB SSD",
    description:
      `Reliable, affordable, and packed with the essentials — the Dell Inspiron 15 3000 is Dell's most popular laptop for good reason. It handles everyday tasks like a champ and looks great doing it.

KEY FEATURES:
• 12th Gen Intel Core i5-1235U — 10 cores for responsive, efficient everyday computing
• 8GB DDR4 RAM — runs multiple apps, browsers, and video calls simultaneously
• 256GB M.2 PCIe SSD — fast storage with an easily upgradeable slot
• 15.6" FHD (1920x1080) ComfortView Plus display — low blue-light certified for eye comfort
• Intel UHD Graphics — smooth visuals for presentations, streaming, and light editing
• 2x USB-A + 1x USB-C + 1x HDMI + SD card reader
• Dell Mobile Connect — mirror your smartphone on your laptop wirelessly
• Up to 8 hours battery life
• Windows 11 Home

IN THE BOX:
Dell Inspiron 15, 65W power adapter, user guide.`,
    priceKobo: 28_500_000,
    category: "Computing",
    stock: 27,
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    ],
  },
  {
    name: "Logitech MK540 Wireless Keyboard & Mouse Combo",
    description:
      `The Logitech MK540 is a full-size, comfortable wireless keyboard and mouse combo designed for all-day productivity. A single USB nano receiver connects both devices — no pairing required.

KEY FEATURES:
• Quiet keys with whisper-quiet typing feel — 90% quieter than standard keyboards
• Full-size keyboard with numeric keypad
• Contoured, right-handed mouse with side-to-side scrolling
• 36-month keyboard battery + 18-month mouse battery
• 10-metre wireless range — freedom to work from anywhere in the room
• Spill-resistant keyboard design
• Easy-Switch multi-device pairing
• Compatible with Windows, macOS, Chrome OS

IN THE BOX:
MK540 keyboard, M210 mouse, USB nano receiver, 2x AA batteries (keyboard), 1x AA battery (mouse).`,
    priceKobo: 1_850_000,
    category: "Computing",
    stock: 84,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
    ],
  },
  {
    name: "HP LaserJet Pro MFP M428fdw Printer",
    description:
      `Print, scan, copy, and fax with exceptional speed and quality. The HP LaserJet Pro M428fdw is built for busy home offices and small businesses that demand professional results.

KEY FEATURES:
• Print speed up to 38 pages per minute — never wait long for your documents
• Duplex (double-sided) printing, scanning, and copying — save paper automatically
• Wi-Fi, Ethernet, and USB connectivity
• 2.7" colour touchscreen — simple, intuitive control panel
• HP Smart App compatible — print and scan from your iPhone, iPad, or Android
• 50-page ADF (Automatic Document Feeder)
• 250-sheet input tray — fewer refills for high-volume printing
• Works with original HP toner cartridges (CF258A/CF258X)

IN THE BOX:
HP LaserJet MFP M428fdw, USB cable, power cord, toner cartridge (starter), documentation.`,
    priceKobo: 9_500_000,
    category: "Computing",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80",
      "https://images.unsplash.com/photo-1586171555626-15e40ece8ae5?w=600&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    ],
  },

  // ── Fashion ─────────────────────────────────────────────────────────────────
  {
    name: "Nike Air Max 270 React Men's Sneakers",
    description:
      `The Nike Air Max 270 React blends two of Nike's most innovative cushioning technologies to deliver unparalleled comfort and a bold, eye-catching silhouette.

KEY FEATURES:
• Air Max 270 heel unit — Nike's tallest heel air unit delivers a supremely cushioned ride
• React foam midsole — springy, responsive cushioning that returns energy with every step
• Breathable mesh upper with synthetic overlays — lightweight structure with targeted support
• Rubber outsole with waffle pattern — durable traction on various surfaces
• Padded collar and tongue — snug, comfortable fit right out of the box
• Available sizes: UK 6–12
• Available colours: Black/White, White/Blue, Triple Black, Red/White

SIZING NOTE:
These run true to size. If between sizes, go half a size up for a comfortable fit.`,
    priceKobo: 2_200_000,
    category: "Fashion",
    stock: 93,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    ],
  },
  {
    name: "Women's Premium Ankara Print Maxi Dress",
    description:
      `Celebrate your African heritage in style with this beautifully crafted Ankara print maxi dress. Made from 100% high-quality African wax print cotton.

KEY FEATURES:
• Fabric: 100% premium African wax print cotton — vibrant, breathable, and colourfast
• Length: Full maxi (floor-length) — elegant and modest for all occasions
• Fit: A-line silhouette with fitted bodice — flattering on all body types
• Sleeves: Sleeveless with subtle shoulder detail
• Closure: Hidden side zip with hook-and-eye top
• Occasion: Church, traditional ceremonies, office wear, weddings, parties
• Machine washable (30°C gentle cycle)
• Sizes available: S (UK 8), M (UK 10–12), L (UK 14), XL (UK 16), XXL (UK 18–20)

STYLING TIP:
Pair with platform wedges and statement gold jewellery for a complete traditional look.`,
    priceKobo: 850_000,
    category: "Fashion",
    stock: 67,
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
      "https://images.unsplash.com/photo-1612722432474-b971cdcea546?w=600&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    ],
  },
  {
    name: "Men's Genuine Leather Chronograph Watch",
    description:

      `Make a statement on the wrist that says sophistication without saying a word. This men's genuine leather chronograph watch combines Japanese quartz precision with Italian leather craftsmanship.

KEY FEATURES:
• Movement: Japanese Miyota quartz chronograph — accurate, reliable, battery-powered
• Case: 42mm stainless steel case with brushed and polished finish
• Dial: Sunray-brushed dial with three subdials: 60-second, 30-minute, 12-hour chronograph counters
• Crystal: Scratch-resistant mineral crystal
• Strap: Genuine Italian cow-leather strap with deployment clasp
• Water resistance: 50m (5 ATM) — safe for hand washing and light rain
• Lug width: 22mm (standard strap for easy replacement)
• Luminous hour and minute hands — easy reading in dim conditions
• Battery life: approximately 3 years with standard use

IN THE BOX:
Watch, extra pin for sizing, polishing cloth, presentation box.`,
    priceKobo: 1_850_000,
    category: "Fashion",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1690040172816-a8a6a0f1b994?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1690040172816-a8a6a0f1b994?w=600&q=80",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    ],
  },
  {
    name: "Women's Luxury Tote Handbag — Genuine Leather",
    description:
      `A handbag that does it all — the everyday luxury tote you reach for every morning without thinking twice. Crafted from full-grain genuine leather with gold-tone hardware.

KEY FEATURES:
• Material: Full-grain genuine cow leather — ages beautifully over time
• Dimensions: 38cm (W) × 30cm (H) × 14cm (D) — spacious enough for a 13" laptop
• Interior: 1 large main compartment, 2 open slip pockets, 1 zip pocket, 1 key holder ring
• Closure: Magnetic snap top closure with optional zip-top security
• Hardware: Polished gold-tone brass — tarnish-resistant
• Handles: Double top handles (57cm drop) + detachable adjustable shoulder strap (110cm max)
• Lining: Full suede interior with brand embossed logo
• Available colours: Caramel Tan, Classic Black, Burgundy Red, Nude Blush
• Weight: Approximately 680g

CARE:
Wipe with a soft damp cloth. Store in the dust bag provided when not in use.`,
    priceKobo: 1_550_000,
    category: "Fashion",
    stock: 38,
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    ],
  },

  // ── Home & Office ────────────────────────────────────────────────────────────
  {
    name: "Midea 1.5HP Split Air Conditioner — Inverter Series",
    description:
      `Stay cool all year round with the Midea 1.5HP Inverter Split AC — Nigeria's top-selling air conditioner brand. The inverter compressor technology adjusts cooling output dynamically, using up to 60% less electricity than non-inverter models.

KEY FEATURES:
• Inverter compressor — variable speed operation saves up to 60% on electricity bills
• 1.5HP (12,000 BTU) cooling capacity — ideal for rooms 15–20 square metres
• 5-star energy rating — among the most efficient ACs available in Nigeria
• Built-in Wi-Fi control — operate from anywhere with the Midea Air app
• Auto-clean function — prevents mould growth inside the unit
• Follow Me mode — remote control senses room temperature from your location
• Sleep mode + 24-hour timer — set it and forget it for comfortable overnight cooling
• Turbo Cool — reaches desired temperature up to 30% faster
• Operating temperature range: -15°C to 50°C (works in Nigerian heat!)

IN THE BOX:
Indoor unit, outdoor unit, remote control, batteries, installation kit, user manual.`,
    priceKobo: 14_500_000,
    category: "Home & Office",
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
  },
  {
    name: "Binatone 18\" Standing Fan — SF-1888",
    description:
      `Beat the Nigerian heat with the Binatone 18" Standing Fan — a powerful, whisper-quiet pedestal fan trusted by millions of Nigerian homes.

KEY FEATURES:
• 18-inch blade span — powerful airflow that reaches every corner of large rooms
• 3-speed settings (Low / Medium / High) — dial in the perfect cooling comfort
• 75° wide-angle oscillation — rotates side-to-side automatically for full room coverage
• Adjustable height: 95–120cm — set the airflow direction exactly where you need it
• Removable and washable front grill — easy cleaning for fresh, hygienic air
• Safety guard with child-proof blade spacing
• Thermal cut-out protection — automatically shuts off if motor overheats
• Rubber feet for stable, non-slip placement on any floor surface
• Power: 85W | Voltage: 220–240V 50Hz | Noise level: <55dB at maximum speed

IN THE BOX:
Fan head, base, pole (2-piece), blade, front and rear grills, instruction manual.`,
    priceKobo: 2_850_000,
    category: "Home & Office",
    stock: 58,
    imageUrl: "https://images.unsplash.com/photo-1622038435985-77e5a50e2e3f?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1622038435985-77e5a50e2e3f?w=600&q=80",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80",
      "https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6?w=600&q=80",
    ],
  },
];

async function seed() {
  console.log("🌱  Seeding products…");

  // Clear existing products so the script is idempotent
  await db.delete(productsTable);

  const inserted = await db.insert(productsTable).values(products).returning();

  console.log(`✅  Inserted ${inserted.length} products:`);
  for (const p of inserted) {
    const naira = (p.priceKobo / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    });
    console.log(`   [${p.id}] ${p.name} — ${naira} — ${p.images.length} image(s)`);
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
