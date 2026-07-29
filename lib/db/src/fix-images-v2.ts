/**
 * Fixes 6 confirmed image mismatches found by visual inspection.
 * Run with: pnpm --filter @workspace/db run fix-images-v2
 */
import { db, productsTable } from "./index.js";
import { eq } from "drizzle-orm";

const BASE = "https://images.unsplash.com/photo-";
const Q = "?w=500&q=80";
const u = (id: string) => `${BASE}${id}${Q}`;

const fixes: Record<string, { imageUrl: string; images: string[] }> = {
  // Ice cream → kitchen appliances on counter
  "Binatone Table Blender — BLG-403": {
    imageUrl: u("1570222094114-d054a817e56b"),
    images: [
      u("1570222094114-d054a817e56b"),
      u("1570222094114-d054a817e56b"),
      u("1570222094114-d054a817e56b"),
    ],
  },
  // Milk being poured → white rice/grain granules
  "Dangote Sugar Refinery — 50kg Bag Granulated Sugar": {
    imageUrl: u("1586201375761-83865001e31c"),
    images: [
      u("1586201375761-83865001e31c"),
      u("1586201375761-83865001e31c"),
      u("1586201375761-83865001e31c"),
    ],
  },
  // Green sofa → elegant bedroom
  "Morning Glory Orthopedic Foam Mattress — 6×4.5ft Queen": {
    imageUrl: u("1505693416388-ac5ce068fe85"),
    images: [
      u("1505693416388-ac5ce068fe85"),
      u("1631049307264-da0ec9d70304"),
      u("1505693416388-ac5ce068fe85"),
    ],
  },
  // Couple cooking → woman stirring on gas stove
  "Scanfrost 5-Burner Gas Cooker with Oven — SFCK5500": {
    imageUrl: u("1556911220-e15b29be8c8f"),
    images: [
      u("1556911220-e15b29be8c8f"),
      u("1556911220-e15b29be8c8f"),
      u("1556911220-e15b29be8c8f"),
    ],
  },
  // Black Gucci crossbody → red/tan structured leather bag
  "Ladies' Genuine Leather Tote Bag — Tan Brown": {
    imageUrl: u("1584917865442-de89df76afd3"),
    images: [
      u("1584917865442-de89df76afd3"),
      u("1584917865442-de89df76afd3"),
      u("1584917865442-de89df76afd3"),
    ],
  },
  // Kitchen interior → orange cast iron pot on stovetop
  "Stainless Steel Cookware Set — 8 Pieces": {
    imageUrl: u("1590794056226-79ef3a8147e1"),
    images: [
      u("1590794056226-79ef3a8147e1"),
      u("1590794056226-79ef3a8147e1"),
      u("1590794056226-79ef3a8147e1"),
    ],
  },
};

async function run() {
  console.log("🔧  Fixing 6 mismatched product images…");
  let updated = 0;

  for (const [name, { imageUrl, images }] of Object.entries(fixes)) {
    const result = await db
      .update(productsTable)
      .set({ imageUrl, images, updatedAt: new Date() })
      .where(eq(productsTable.name, name))
      .returning({ id: productsTable.id, name: productsTable.name });

    if (result.length > 0) {
      console.log(`  ✅  [${result[0]!.id}] ${result[0]!.name}`);
      updated++;
    } else {
      console.warn(`  ⚠️  Not found: "${name}"`);
    }
  }

  console.log(`\n✅  Updated ${updated}/${Object.keys(fixes).length} products.`);
}

run().then(() => process.exit(0)).catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
