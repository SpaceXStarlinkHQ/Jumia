/**
 * Seed script — populates the store with the 6 real products.
 * Run with: pnpm --filter @workspace/db run seed
 *
 * Prices are stored in kobo (₦1 = 100 kobo).
 */
import { db, productsTable } from "./index.js";

const products = [
  // ── Home Appliances ──────────────────────────────────────────────────────────
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
• Reversible lid — can be opened from either side to suit your space

IDEAL FOR: Meat, fish, vegetables, ice cream, drinks, pharmaceutical storage

IN THE BOX: Deep Freezer unit, wire basket, user manual, warranty card.`,
    priceKobo: 8_000_000,
    category: "Home & Office",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
  },
  {
    name: "219L LG Double Door Refrigerator — GL-B221ALLB",
    description: `The LG 219L Double Door Refrigerator delivers smart cooling, sleek design, and dependable performance for every Nigerian kitchen. With advanced features that keep food fresh longer, it's the upgrade your home deserves.

KEY FEATURES:
• 219-litre total capacity — generous storage for families of 4-6
• Smart Diagnosis™ — LG's app-based troubleshooting technology for fast support
• Linear Compressor — quieter, more energy-efficient, and backed by a 10-year warranty
• Multi Air Flow system — circulates cold air evenly throughout every shelf and drawer
• Toughened glass shelves — hold up to 100kg, easy to clean
• Twist Ice Maker — makes ice without a separate icemaker
• Door Cooling+ — cools the door compartments as effectively as the main section
• 220V compatible, energy-saving A+ rating

IN THE BOX: Refrigerator unit, removable shelves, crisper drawers, user manual, warranty card.`,
    priceKobo: 7_500_000,
    category: "Home & Office",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
  },
  {
    name: "Hisense 8KG Top Load Washing Machine — WTX8012T",
    description: `Experience powerful, efficient cleaning with the Hisense 8KG Top Load Washing Machine. Designed to handle large laundry loads with ease, it's the reliable household partner for busy Nigerian families.

KEY FEATURES:
• 8kg drum capacity — handles bedsheets, curtains, and large family loads
• 12 wash programs — Normal, Delicate, Heavy Duty, Quick Wash, Spin Only, and more
• Fuzzy logic control — automatically senses load size and adjusts water and time
• 700 RPM spin speed — extracts more water so clothes dry faster
• Magic Filter — traps lint and debris from every wash cycle
• Child lock — prevents accidental changes during cycles
• Water level selector — 4 levels for precise water usage
• Delay start — schedule washes up to 24 hours in advance
• Transparent lid — monitor your laundry without opening

IN THE BOX: Washing machine, inlet hose, drain hose, user manual, warranty card.`,
    priceKobo: 5_000_000,
    category: "Home & Office",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1a7c3a43?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1626806787461-102c1a7c3a43?w=600&q=80",
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
  },
  {
    name: "Sumec Firman 3KVA Generator — SPG3000E2",
    description: `Never let power outages slow you down. The Sumec Firman SPG3000E2 delivers reliable 3KVA output to power your home essentials — from TVs and fans to freezers and lights — with push-button electric start convenience.

KEY FEATURES:
• 3KVA / 2.8KW rated output — runs TVs, fans, freezers, lights, and charging points simultaneously
• Electric start + recoil start backup — starts easily every time
• 6.5HP Firman engine — built for tropical climates and extended use
• 15-litre fuel tank — up to 8 hours of continuous runtime on a full tank
• AVR (Automatic Voltage Regulator) — protects appliances from voltage fluctuations
• Low oil shutdown — automatic engine protection when oil runs low
• 2× AC outlets (220V) + 1× 12V DC outlet
• Hour meter — tracks engine runtime for scheduled maintenance
• Noise level: ≈68 dB at 7 metres

SPECIFICATIONS:
• Engine: 4-stroke, air-cooled OHV
• Fuel: Petrol (Premium Motor Spirit)
• Tank capacity: 15L
• Weight: 68kg

IN THE BOX: Generator, user manual, toolkit (spanners, screwdriver), funnel, warranty card.`,
    priceKobo: 7_000_000,
    category: "Home & Office",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
    ],
  },
  {
    name: '43" LG/Hisense Television Set',
    description: `Transform your living room with the 43" LG/Hisense Television Set. Enjoy crisp picture quality, built-in streaming apps, and seamless DSTV/GOtv connectivity — all in one stylish, slim panel.

KEY FEATURES:
• 43-inch Full HD (1920×1080) LED display — vivid colours and sharp detail
• VIDAA Smart OS — built-in Netflix, YouTube, Prime Video, and more
• Dolby Audio — rich, cinema-quality sound from two built-in 8W speakers
• HDMI × 2, USB × 2 — connect decoders, game consoles, thumb drives, and laptops
• AV input for legacy devices (DVD players, VHS)
• Screen Mirroring / Wireless Casting — mirror your smartphone screen instantly
• Satellite (DVB-S2) + Terrestrial (DVB-T2) tuners — works with DSTV dish and antenna
• Energy-saving mode — reduces power draw without sacrificing brightness
• Slim bezel design — maximises screen-to-body ratio
• VESA wall-mount compatible (200×200mm)

SPECIFICATIONS:
• Resolution: 1920 × 1080 (Full HD)
• Refresh rate: 60Hz
• Panel type: DLED
• Power: 60W typical

IN THE BOX: TV, remote control (batteries included), stand + screws, power cable, user manual.`,
    priceKobo: 7_000_000,
    category: "Electronics",
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f4534a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f4534a?w=600&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80",
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600&q=80",
    ],
  },
  {
    name: "Tecno Camon 40 Pro 5G",
    description: `Capture every moment in stunning detail with the Tecno Camon 40 Pro 5G — the camera-first smartphone built for Nigerian content creators, trendsetters, and everyday users who refuse to compromise on quality.

KEY FEATURES:
• 50MP AI Triple Camera — ultra-clear photos day and night with AI scene optimisation
• AMOLED Vivid Display — deep blacks, punchy colours, and buttery-smooth scrolling
• 256GB Storage + 16GB RAM — store thousands of photos, videos, and apps without slowing down
• 5G Connectivity — future-ready network speeds for streaming, gaming, and video calls
• 45W Fast Charging — from 0 to full in under an hour; less time charging, more time shooting
• MediaTek Dimensity Processor — powerful enough for multitasking, gaming, and heavy apps
• IP64 Splash Resistance — protected against everyday dust and water splashes
• Sleek design with premium glass back — available in Aqua Green, Midnight Blue, and Pearl White

IN THE BOX: Camon 40 Pro 5G handset, 45W fast charger, USB-C cable, SIM ejector pin, silicone case, earbuds, smartwatch (bonus bundle), screen protector, user manual, warranty card.

WARRANTY: 1 year manufacturer warranty via Tecno Nigeria authorised service centres.`,
    priceKobo: 14_000_000,
    category: "Phones & Tablets",
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80",
    ],
  },
  {
    name: "Morning Glory Orthopedic Foam Mattress — 6×4.5ft (Queen)",
    description: `Sleep better every night with the Morning Glory Orthopedic Foam Mattress. Trusted across Nigeria for superior comfort and durability, this queen-size mattress gives your back the support it needs while cushioning every pressure point for a deep, restful sleep.

KEY FEATURES:
• High-density orthopedic foam — provides firm yet comfortable support for spine alignment
• 6×4.5ft queen size — perfect for double beds and master bedrooms
• 8-inch profile — deep enough for plush comfort without feeling too soft
• Anti-sag technology — retains shape and firmness for years of use
• Breathable knitted fabric cover — promotes airflow and regulates temperature
• Hypoallergenic — resistant to dust mites and allergens
• Easy-to-clean cover — wipe down with a damp cloth
• Fire-retardant materials — meets Nigerian Standards Organisation (SON) requirements
• 3-year manufacturer warranty

DIMENSIONS: 183cm (L) × 137cm (W) × 20cm (H)
WEIGHT: Approx. 22kg

IDEAL FOR: Adults, couples, guest rooms, master bedrooms

IN THE BOX: Mattress (vacuum-rolled for easy transport), care instruction card, warranty card.`,
    priceKobo: 4_500_000,
    category: "Home & Office",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
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
