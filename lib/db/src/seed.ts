/**
 * Seed script — populates the store with initial products.
 * Run with: pnpm --filter @workspace/db run seed
 *
 * Prices are the 80%-off PROMO prices stored in kobo.
 * Original (strikethrough) prices are computed by the frontend from the discount %.
 */
import { db, productsTable } from "./index.js";

const products = [
  {
    name: "Electric Mountain Bike",
    description:
      "High-performance electric mountain bike with 48V 15Ah lithium battery, 500W brushless motor, 21-speed Shimano gears, hydraulic disc brakes, and 100km range per charge. Perfect for city commuting and off-road adventures.",
    priceKobo: 12_000_000, // ₦120,000 promo (originally ₦600,000)
    category: "Electronics",
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop&q=80",
  },
  {
    name: "Tecno Spark 20 Pro+ Smartphone",
    description:
      "6.8-inch FHD+ display, 256GB internal storage, 8GB RAM, 108MP triple camera, 5000mAh battery with 33W fast charge, Android 14, dual SIM. Available in midnight black and pearl white.",
    priceKobo: 3_500_000, // ₦35,000 promo (originally ₦175,000)
    category: "Phones & Tablets",
    stock: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&fit=crop&q=80",
  },
  {
    name: "Samsung 43\" 4K UHD Smart TV",
    description:
      "43-inch Crystal UHD 4K display, built-in WiFi, Netflix/YouTube/Prime Video, Tizen OS, 3 HDMI ports, 2 USB, Dolby Digital Plus sound. Energy-saving mode and remote-access compatible.",
    priceKobo: 6_500_000, // ₦65,000 promo (originally ₦325,000)
    category: "Electronics",
    stock: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&fit=crop&q=80",
  },
  {
    name: "Haier Thermocool 200L Deep Freezer",
    description:
      "200-litre chest freezer with quick-freeze function, R600a eco-friendly refrigerant, adjustable thermostat, interior light, and heavy-duty lid. Ideal for home, shop, and restaurant use.",
    priceKobo: 4_200_000, // ₦42,000 promo (originally ₦210,000)
    category: "Home & Office",
    stock: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&fit=crop&q=80",
  },
  {
    name: "1.5KVA Solar Power System (Complete Kit)",
    description:
      "Complete solar kit: 2× 200W monocrystalline panels, 1.5KVA hybrid inverter, 200Ah gel battery, charge controller, mounting frames, and all cables. Powers lighting, fans, TV, and small appliances.",
    priceKobo: 9_500_000, // ₦95,000 promo (originally ₦475,000)
    category: "Electronics",
    stock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&fit=crop&q=80",
  },
  {
    name: "LG 7kg Front Load Washing Machine",
    description:
      "7kg front-load washer with AI Direct Drive motor, 6Motion technology, steam wash, 14 programs, child lock, and inverter direct drive for quiet, energy-efficient operation. 5-year motor warranty.",
    priceKobo: 4_800_000, // ₦48,000 promo (originally ₦240,000)
    category: "Home & Office",
    stock: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&fit=crop&q=80",
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
    console.log(`   [${p.id}] ${p.name} — ${naira}`);
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
