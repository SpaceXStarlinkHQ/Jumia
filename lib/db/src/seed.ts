/**
 * Seed script — populates the store with 20 products across 7 categories (3 images each).
 * Run with: pnpm --filter @workspace/db run seed
 *
 * Prices are stored in kobo (₦1 = 100 kobo).
 */
import { db, productsTable } from "./index.js";

const products = [
  // ── Phones & Tablets (4) ────────────────────────────────────────────────────
  {
    name: "Tecno Camon 40 Pro 5G — 256GB/16GB RAM",
    description: `Experience next-level photography and performance with the Tecno Camon 40 Pro 5G. Featuring a stunning 6.78" AMOLED curved display with 144Hz refresh rate, this powerhouse smartphone delivers silky-smooth scrolling and vivid visuals.

KEY FEATURES:
• 50MP OIS Main Camera + 50MP Front Camera — razor-sharp portraits and selfies even in low light
• 5G-ready MediaTek Dimensity 8020 processor — blazing fast app launches and seamless multitasking
• 16GB RAM + 256GB internal storage (expandable to 1TB via microSD)
• 5000mAh battery with 45W Flash Charge — 0 to 70% in just 30 minutes
• 144Hz AMOLED curved display — immersive for gaming and streaming
• Android 14 with HiOS 14 — clean, intuitive interface with smart AI features
• IP54 splash resistance

IN THE BOX: Phone, 45W charger, USB-C cable, protective case, screen protector, SIM ejector pin.`,
    priceKobo: 18_900_000,
    category: "Phones & Tablets",
    stock: 47,
    imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80",
    ],
  },
  {
    name: "Samsung Galaxy A55 5G — 128GB/8GB RAM",
    description: `The Samsung Galaxy A55 5G redefines mid-range excellence with a premium glass-and-metal design. Its triple-camera system and brilliant Super AMOLED display make it the ultimate everyday companion.

KEY FEATURES:
• 50MP Main + 12MP Ultra-Wide + 5MP Macro triple camera
• 6.6" Super AMOLED display, 120Hz — smooth and bright with 1000 nits peak brightness
• Exynos 1480 octa-core processor — efficient and powerful
• 8GB RAM + 128GB storage (expandable up to 1TB)
• 5000mAh battery + 25W fast charging
• IP67 water and dust resistance
• Samsung Knox security — enterprise-grade data protection
• 5 years of OS updates guaranteed

IN THE BOX: Phone, 25W adapter, USB-C cable, SIM ejector tool.`,
    priceKobo: 28_500_000,
    category: "Phones & Tablets",
    stock: 32,
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600&q=80",
    ],
  },
  {
    name: "Apple iPhone 15 — 128GB (Midnight)",
    description: `The iPhone 15 is a masterclass in refined engineering. With the Dynamic Island, a 48MP main camera, and the powerful A16 Bionic chip, it delivers a premium experience that is instantly recognisable and endlessly capable.

KEY FEATURES:
• 48MP main camera with 2× optical-quality zoom and up to 4K 60fps video
• Dynamic Island — an interactive display cutout that surfaces alerts and Live Activities
• A16 Bionic chip — industry-leading performance and energy efficiency
• 6.1" Super Retina XDR OLED display with 2000 nits peak outdoor brightness
• USB-C connector — faster data transfer and universal charging
• Emergency SOS via satellite
• Crash Detection
• Up to 20 hours video playback

IN THE BOX: iPhone 15, USB-C to USB-C Cable (1 m), Documentation.`,
    priceKobo: 95_000_000,
    category: "Phones & Tablets",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
      "https://images.unsplash.com/photo-1697559266660-6dd31e073cff?w=600&q=80",
      "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80",
    ],
  },
  {
    name: "Infinix Hot 40 Pro — 256GB/8GB RAM",
    description: `The Infinix Hot 40 Pro punches far above its weight class, packing flagship-inspired features into an incredibly accessible price. Built for the hustle.

KEY FEATURES:
• 108MP AI Triple Rear Camera — capture stunning detail at a fraction of flagship cost
• 6.78" AMOLED display, 120Hz — smooth scrolling and vivid colour accuracy
• Helio G99 processor — smooth gaming and multitasking without compromise
• 8GB RAM + 256GB storage (expandable up to 1TB)
• Massive 5000mAh battery + 45W fast charging
• XOS 13.5 based on Android 13 — clean, feature-packed experience
• Dual SIM + dedicated microSD slot

IN THE BOX: Phone, 45W charger, USB-C cable, protective case, screen protector.`,
    priceKobo: 12_500_000,
    category: "Phones & Tablets",
    stock: 63,
    imageUrl: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80",
      "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=600&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
    ],
  },

  // ── Electronics (3) ─────────────────────────────────────────────────────────
  {
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    description: `Industry-leading noise cancellation meets exceptional sound quality in the Sony WH-1000XM5. Eight microphones and two processors work together to automatically optimise noise cancellation based on your environment.

KEY FEATURES:
• Industry-leading noise cancellation with Integrated Processor V1
• 30-hour battery life with quick charging (3 min = 3 hours playback)
• Crystal-clear hands-free calling with 4 beamforming microphones
• Multipoint connection — connect to two Bluetooth devices simultaneously
• Speak-to-Chat — automatically pauses music when you start talking
• Comfortable, lightweight design at just 250g
• Hi-Res Audio and Hi-Res Audio Wireless (LDAC)
• Adaptive Sound Control — adjusts settings based on your activity

IN THE BOX: Headphones, USB-C charging cable, audio cable (3.5mm), carrying case.`,
    priceKobo: 38_000_000,
    category: "Electronics",
    stock: 24,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    ],
  },
  {
    name: "LG 43\" 4K UHD Smart TV — 43UQ7000",
    description: `Bring cinema home with the LG 43" 4K UHD Smart TV. Powered by the α5 Gen5 AI Processor 4K, this television delivers stunning picture quality and intelligent upscaling for every source.

KEY FEATURES:
• 4K UHD resolution — 4× the detail of Full HD for breathtaking clarity
• α5 Gen5 AI Processor — intelligent upscaling and noise reduction
• webOS 22 Smart Platform — access Netflix, YouTube, Prime Video, and more
• ThinQ AI — control with your voice via Google Assistant or Amazon Alexa
• HDR10 Pro and HLG support — richer colours and deeper contrast
• 3× HDMI, 2× USB, Bluetooth, Wi-Fi built in
• Magic Remote included — intuitive point-and-click navigation
• Game Optimizer for smoother gaming performance

IN THE BOX: TV, Magic Remote, power cable, stand + screws, quick setup guide.`,
    priceKobo: 55_000_000,
    category: "Electronics",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80",
      "https://images.unsplash.com/photo-1461151304267-38566f24ed26?w=600&q=80",
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600&q=80",
    ],
  },
  {
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    description: `The JBL Charge 5 is a portable Bluetooth speaker that delivers powerfully bold JBL Original Pro Sound with a stunning design. Your music now goes wherever you do.

KEY FEATURES:
• JBL Original Pro Sound — punchy bass and crystal-clear highs
• 20-hour battery life — all-day and into-the-night music
• IP67 waterproof and dustproof — take it to the beach, pool, or camping
• PartyBoost — connect multiple JBL speakers for bigger sound
• Built-in power bank — charge your devices on the go
• Integrated bass radiator for deep bass at any volume
• USB-C charging

IN THE BOX: JBL Charge 5 speaker, USB-C charging cable, safety sheet.`,
    priceKobo: 18_500_000,
    category: "Electronics",
    stock: 41,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    ],
  },

  // ── Computing (3) ───────────────────────────────────────────────────────────
  {
    name: "HP Pavilion 15 Laptop — Core i5/16GB/512GB SSD",
    description: `The HP Pavilion 15 combines sleek design with powerful performance, making it the perfect laptop for work, study, and entertainment. Thin, light, and ready for anything.

KEY FEATURES:
• 12th Gen Intel Core i5-1235U processor — 10 cores for snappy multitasking
• 16GB DDR4 RAM — smooth performance even with multiple apps open
• 512GB PCIe NVMe SSD — fast boot and file access
• 15.6" Full HD IPS display — wide viewing angles and accurate colours
• Intel Iris Xe integrated graphics — handles light creative work and video editing
• Full-size backlit keyboard — comfortable typing in any light
• Wi-Fi 6 + Bluetooth 5.3
• Up to 8.5 hours battery life
• USB-C (with DisplayPort), USB-A × 2, HDMI, headphone jack, SD card reader

IN THE BOX: Laptop, 65W USB-C power adapter, documentation.`,
    priceKobo: 72_000_000,
    category: "Computing",
    stock: 21,
    imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    ],
  },
  {
    name: "Logitech MX Master 3S Wireless Mouse",
    description: `The MX Master 3S is our most advanced master series mouse yet. Crafted for creators and engineered for precision, this wireless mouse gives you the control to perform at your absolute best.

KEY FEATURES:
• 8K DPI sensor — works on any surface including glass
• MagSpeed electromagnetic scrolling — whisper-quiet, instant precise scrolling
• 3 device multi-pairing — switch between computers with one click
• USB-C quick charging — 1 minute charge = 3 hours use
• 70-day battery life on a full charge
• Ergonomic sculpted design for all-day comfort
• Customisable buttons via Logi Options+
• Connects via USB receiver or Bluetooth

IN THE BOX: MX Master 3S mouse, USB-C charging cable, USB receiver.`,
    priceKobo: 12_000_000,
    category: "Computing",
    stock: 56,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
      "https://images.unsplash.com/photo-1615750173577-61ef89f3f03a?w=600&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    ],
  },
  {
    name: "Samsung T7 Portable SSD — 1TB",
    description: `Transfer, store, and edit massive files anywhere with the Samsung T7 Portable SSD. Compact, fast, and built tough, it's the perfect external storage for creatives and professionals.

KEY FEATURES:
• Blazing transfer speeds up to 1,050 MB/s read and 1,000 MB/s write (USB 3.2 Gen 2)
• 1TB capacity — store up to 250,000 photos or 50 hours of 4K video
• Solid-state durability — no moving parts, drop-resistant up to 2 metres
• Shock-resistant aluminium body — compact and lightweight at 98g
• Compatible with PC, Mac, Android smartphones, and gaming consoles
• USB-C and USB-A cables included for universal compatibility
• Optional password protection with AES 256-bit hardware encryption

IN THE BOX: Samsung T7, USB Type-C to C cable, USB Type-C to A cable.`,
    priceKobo: 11_500_000,
    category: "Computing",
    stock: 38,
    imageUrl: "https://images.unsplash.com/photo-1639252060789-e4c57cd61fa1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1639252060789-e4c57cd61fa1?w=600&q=80",
      "https://images.unsplash.com/photo-1601737487795-dab272f52420?w=600&q=80",
      "https://images.unsplash.com/photo-1628556270448-4d0e4b2e4f7a?w=600&q=80",
    ],
  },

  // ── Home & Office (3) ───────────────────────────────────────────────────────
  {
    name: "Midea 1.5HP Split Air Conditioner — MST1-12CRN8",
    description: `Stay cool and comfortable all year round with the Midea 1.5HP Split Air Conditioner. Designed for Nigerian conditions, this unit delivers powerful cooling with energy-saving efficiency.

KEY FEATURES:
• 1.5HP (12,000 BTU) cooling capacity — ideal for rooms up to 18m²
• R32 eco-friendly refrigerant — lower global warming potential
• Turbo Cool mode — rapid temperature drop in minutes
• Sleep mode — automatically adjusts temperature overnight for comfort savings
• Self-cleaning function — keeps the unit hygienic and running efficiently
• 4-way air flow distribution — even cooling across the whole room
• Anti-bacterial filter — removes dust and allergens from circulating air
• Wi-Fi ready — control from your phone via the Midea Air app
• Energy efficiency class A

IN THE BOX: Indoor unit, outdoor unit, remote control, installation hardware, user manual.`,
    priceKobo: 48_000_000,
    category: "Home & Office",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    ],
  },
  {
    name: "Binatone 18\" Standing Fan — SF-4518",
    description: `Beat the heat with the Binatone 18" Standing Fan. Reliable, powerful, and whisper-quiet, this fan is an essential fixture in any Nigerian home or office.

KEY FEATURES:
• 18-inch blade span — powerful airflow for large rooms
• 3-speed settings (Low / Medium / High)
• 75° oscillation — wide coverage across the room
• Adjustable height: 95–120cm
• Removable and washable front grill
• Safety guard with child-proof blade spacing
• Thermal cut-out protection — shuts off if motor overheats
• Rubber feet for stable, non-slip placement
• Power: 85W | Noise level: <55dB at max speed

IN THE BOX: Fan head, base, pole (2-piece), blade, front and rear grills, instruction manual.`,
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
  {
    name: "Polystar 3.5KVA Pure Sine Wave Inverter + 200Ah Battery Bundle",
    description: `Never suffer power outages again with this complete inverter and battery bundle. The Polystar 3.5KVA Pure Sine Wave Inverter delivers clean, stable power that protects your sensitive electronics.

KEY FEATURES:
• 3.5KVA / 2800W pure sine wave output — safe for air conditioners, fridges, TVs, and computers
• 24V system with dual 200Ah tubular batteries included — up to 8 hours backup for typical home load
• Auto-changeover in under 20ms — seamless transition, appliances don't even notice the switch
• LCD display — shows battery level, load percentage, charging status, and fault codes
• Overload and short-circuit protection — your appliances stay safe
• PWM charging — maximises battery lifespan
• Compatible with solar panels (24V solar input supported)
• 2-year warranty on inverter, 18-month warranty on batteries

IN THE BOX: Inverter unit, 2× 200Ah tubular batteries, battery cables, user manual.`,
    priceKobo: 145_000_000,
    category: "Home & Office",
    stock: 9,
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899a9bd067?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
  },

  // ── Kitchen & Dining (3) ────────────────────────────────────────────────────
  {
    name: "Scanfrost 20L Digital Microwave Oven — SCMWO20",
    description: `The Scanfrost 20L Digital Microwave brings convenience and precision to your kitchen. From quick reheats to full cooking, it handles every task with ease.

KEY FEATURES:
• 20-litre capacity — fits a dinner plate comfortably
• 700W output power with 5 power levels
• Digital display with touch control pad
• 8 auto-cook menus — popcorn, pizza, rice, and more preset and ready
• Defrost by weight or time
• Child lock for safety
• 30-second express cooking button
• Interior light and easy-clean enamel cavity
• Turntable diameter: 25.5cm

IN THE BOX: Microwave oven, glass turntable, ring support, instruction manual.`,
    priceKobo: 8_500_000,
    category: "Kitchen & Dining",
    stock: 34,
    imageUrl: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      "https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=600&q=80",
    ],
  },
  {
    name: "Philips Viva Collection Blender — HR2118",
    description: `The Philips Viva Collection Blender makes light work of tough ingredients — from fibrous greens to frozen fruit. Powerful, easy to clean, and built to last.

KEY FEATURES:
• 600W motor — tackles ice, frozen fruit, nuts, and leafy greens with ease
• ProBlend 4 technology — unique blade design ensures faster, smoother results
• 2-litre large jar — blend enough for the whole family at once
• 3 speed settings + pulse function — precise control over texture
• Easy-clean design — detachable blades and dishwasher-safe parts
• Anti-slip base — stays firmly in place during use
• Safety lock lid with filler cap

IN THE BOX: Blender body, 2L jar, lid with filler cap, instruction manual.`,
    priceKobo: 4_200_000,
    category: "Kitchen & Dining",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80",
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
  },
  {
    name: "Tefal Non-Stick Cookware Set — 5 Piece",
    description: `Upgrade your kitchen with the Tefal 5-piece non-stick cookware set. Cook healthier meals using less oil without the stress of stuck-on food.

KEY FEATURES:
• Thermo-Spot technology — the red dot turns solid when the pan is perfectly preheated
• Titanium Excellence non-stick coating — 5× more durable than standard non-stick
• Suitable for all hob types including induction
• Dishwasher-safe for easy cleaning
• Heat-resistant handles up to 175°C — oven safe
• Even heat distribution — no hot spots
• Set includes: 20cm saucepan, 24cm frying pan, 26cm frying pan, 24cm deep frying pan, 28cm casserole dish

IN THE BOX: 5-piece cookware set, care and use guide.`,
    priceKobo: 6_800_000,
    category: "Kitchen & Dining",
    stock: 27,
    imageUrl: "https://images.unsplash.com/photo-1584990347449-a9f4ad8ad7dc?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584990347449-a9f4ad8ad7dc?w=600&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80",
    ],
  },

  // ── Health & Beauty (2) ─────────────────────────────────────────────────────
  {
    name: "Braun Series 7 Electric Shaver — 7075cc",
    description: `The Braun Series 7 adapts to every contour of your face delivering a close, comfortable shave — in fewer strokes than the competition.

KEY FEATURES:
• SensoFlex technology — adapts to every facial contour for a precise, gentle shave
• 4 synchronised shaving elements — cut more hair per stroke
• AutoSense reads your beard density and adjusts power 40,000 times per second
• Wet & Dry — use with foam/gel or dry for convenience
• 5 power modes including Sensitive and Turbo
• SmartCare Center cleans, charges, dries, lubricates, and charges automatically
• 50 min cordless use from a full charge
• 100% waterproof — washable under the tap

IN THE BOX: Shaver, SmartCare Center, special cleaning cartridge, charging cable, travel case.`,
    priceKobo: 22_000_000,
    category: "Health & Beauty",
    stock: 19,
    imageUrl: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
    ],
  },
  {
    name: "Nivea Body Lotion — Cocoa Butter 400ml (Pack of 3)",
    description: `Intensely moisturising with the warm, comforting scent of cocoa butter. Nivea Cocoa Butter Body Lotion absorbs quickly to leave skin feeling soft and smooth all day.

KEY FEATURES:
• Enriched with real cocoa butter extract — deep moisturisation for dry to very dry skin
• 48-hour moisture lock — one application, all-day comfort
• Quick-absorbing formula — no greasy residue
• Dermatologically approved
• Suitable for all skin types including sensitive skin
• Pack of 3 × 400ml for great value
• Warm, indulgent cocoa butter fragrance

HOW TO USE: Apply generously to body after bathing or whenever skin feels dry. Massage in circular motions until fully absorbed.`,
    priceKobo: 1_800_000,
    category: "Health & Beauty",
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1585232352617-a91bdac9b826?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1585232352617-a91bdac9b826?w=600&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80",
    ],
  },

  // ── Sporting Goods (2) ──────────────────────────────────────────────────────
  {
    name: "Nike Air Max 270 Sneakers — Unisex",
    description: `The Nike Air Max 270 draws inspiration from the Air Max 93 and Air Max 180, featuring Nike's biggest heel Air unit yet. All-day comfort meets bold street style.

KEY FEATURES:
• Largest heel Air unit of any lifestyle shoe — maximum impact absorption
• Engineered mesh upper — lightweight and breathable
• Foam midsole provides lightweight cushioning
• Rubber outsole with flex grooves for natural movement and traction
• Padded collar for ankle comfort and support
• Available in sizes UK 6–12 (select at checkout)
• Colourway: Black/White/University Red

SIZING GUIDE: We recommend ordering your usual size. If between sizes, go half a size up.

IN THE BOX: Pair of Nike Air Max 270, spare laces, Nike shoebox.`,
    priceKobo: 26_000_000,
    category: "Sporting Goods",
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    ],
  },
  {
    name: "Lifeline Adjustable Dumbbell Set — 2.5–25kg",
    description: `Save space without sacrificing your workout. The Lifeline adjustable dumbbell set replaces 15 pairs of dumbbells with a compact, quick-adjust system.

KEY FEATURES:
• Adjusts from 2.5kg to 25kg in 2.5kg increments — 10 weight settings per dumbbell
• Twist-to-adjust mechanism — change weight in seconds
• Durable ABS plastic casing over iron weight plates
• Anti-roll base keeps dumbbells stable when stored
• Ergonomic handle with textured grip — reduces slipping during intense sets
• Compatible with standard dumbbell racks
• Set includes 2 dumbbells + 2 storage trays

DIMENSIONS (per dumbbell at max weight): 37cm × 17cm × 16cm`,
    priceKobo: 32_000_000,
    category: "Sporting Goods",
    stock: 14,
    imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    ],
  },
];

export async function seedProducts(): Promise<number> {
  console.log("🌱  Seeding products…");

  await db.delete(productsTable);

  const inserted = await db.insert(productsTable).values(products).returning();

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
