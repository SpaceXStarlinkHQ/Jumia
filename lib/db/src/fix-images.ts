/**
 * Replaces broken product image URLs in the database with working Unsplash images.
 * Run with: pnpm --filter @workspace/db run fix-images
 */
import { db, productsTable } from "./index.js";
import { eq } from "drizzle-orm";

// Maps product name → { imageUrl, images }
// Only products with dead/broken URLs are listed here.
const imageUpdates: Record<string, { imageUrl: string; images: string[] }> = {
  // ── Home & Office ──────────────────────────────────────────────────────────
  "Hisense 8KG Top Load Washing Machine — WTX8012T": {
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80",
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    ],
  },
  "Sumec Firman 3KVA Generator — SPG3000E2": {
    imageUrl: "https://images.unsplash.com/photo-1473341304518-ac74e4d8c929?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1473341304518-ac74e4d8c929?w=500&q=80",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&q=80",
    ],
  },
  "Morning Glory Orthopedic Foam Mattress — 6×4.5ft Queen": {
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
    ],
  },
  // ── Electronics ────────────────────────────────────────────────────────────
  '43" LG UHD Smart TV — 43UP7550': {
    imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=500&q=80",
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&q=80",
    ],
  },
  'Hisense 55" QLED 4K Smart TV — 55U6K': {
    imageUrl: "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=500&q=80",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=500&q=80",
    ],
  },
  "Soundcore by Anker Motion Boom Plus Bluetooth Speaker": {
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
      "https://images.unsplash.com/photo-1545454675-3479531966e5?w=500&q=80",
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80",
    ],
  },
  // ── Phones & Tablets ───────────────────────────────────────────────────────
  "Tecno Camon 40 Pro 5G — 256GB": {
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&q=80",
    ],
  },
  "Samsung Galaxy A55 5G — 128GB Awesome Iceblue": {
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    ],
  },
  "Infinix Hot 50 Pro — 256GB Stellar Black": {
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80",
    ],
  },
  // ── Computing ──────────────────────────────────────────────────────────────
  "HP 15s-eq3000 Laptop — Ryzen 5 / 8GB / 512GB SSD": {
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80",
    ],
  },
  "Lenovo IdeaPad Slim 3 — Intel Core i5 / 16GB / 512GB SSD": {
    imageUrl: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    ],
  },
  // ── Fashion ────────────────────────────────────────────────────────────────
  "Men's Polo Ralph Lauren Classic Fit Polo Shirt": {
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&q=80",
      "https://images.unsplash.com/photo-1503341338985-c0338bb29520?w=500&q=80",
    ],
  },
  "Women's Ankara Wrap Midi Dress — Mixed Prints": {
    imageUrl: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500&q=80",
    ],
  },
  "Nike Air Force 1 '07 Sneakers — White/White": {
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&q=80",
    ],
  },
  "Ladies' Genuine Leather Tote Bag — Tan Brown": {
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76a097?w=500&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    ],
  },
  // ── Supermarket ────────────────────────────────────────────────────────────
  "Dangote Sugar Refinery — 50kg Bag Granulated Sugar": {
    imageUrl: "https://images.unsplash.com/photo-1548545774-45f85dc47ce5?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1548545774-45f85dc47ce5?w=500&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb4bdd70a?w=500&q=80",
      "https://images.unsplash.com/photo-1538032542837-b0d88f5a0c6e?w=500&q=80",
    ],
  },
  "Milo Energy Drink Tin — 400g × 3 Pack": {
    imageUrl: "https://images.unsplash.com/photo-1572461882664-bddadff46bf5?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1572461882664-bddadff46bf5?w=500&q=80",
      "https://images.unsplash.com/photo-1517684319025-06b20b37c8e4?w=500&q=80",
      "https://images.unsplash.com/photo-1548545774-45f85dc47ce5?w=500&q=80",
    ],
  },
  "Indomie Instant Noodles — Chicken Flavour (40 packs × 70g)": {
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80",
    ],
  },
  // ── Kitchen & Dining ───────────────────────────────────────────────────────
  "Scanfrost 5-Burner Gas Cooker with Oven — SFCK5500": {
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&q=80",
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&q=80",
    ],
  },
  "Stainless Steel Cookware Set — 8 Pieces": {
    imageUrl: "https://images.unsplash.com/photo-1584990347449-39da99b9b568?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1584990347449-39da99b9b568?w=500&q=80",
      "https://images.unsplash.com/photo-1525351484163-7529414f2adb?w=500&q=80",
      "https://images.unsplash.com/photo-1556910096-6f5e72db7803?w=500&q=80",
    ],
  },
  "Binatone Table Blender — BLG-403": {
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=80",
      "https://images.unsplash.com/photo-1614812514603-84193dd929c4?w=500&q=80",
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&q=80",
    ],
  },
  // ── Health & Beauty ────────────────────────────────────────────────────────
  "Neutrogena Hydro Boost Water Gel Moisturiser — 50ml": {
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
    ],
  },
  "ORS Olive Oil Relaxer Kit — Normal / Super": {
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80",
      "https://images.unsplash.com/photo-1527799820374-87eda0a85e0c?w=500&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500&q=80",
    ],
  },
  "Philips BRE245 Epilator — Women's Hair Removal": {
    imageUrl: "https://images.unsplash.com/photo-1631984564-8d2ea88b5ff5?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1631984564-8d2ea88b5ff5?w=500&q=80",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80",
    ],
  },
  // ── Sporting Goods ─────────────────────────────────────────────────────────
  "Decathlon Domyos Weight Training Dumbbell Set — 20kg": {
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
      "https://images.unsplash.com/photo-1534438327879-b8d55ef6ca0b?w=500&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&q=80",
    ],
  },
  "Nike Phantom GX Academy FG/MG Football Boots": {
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
    ],
  },
  // ── Baby Products ──────────────────────────────────────────────────────────
  "Pampers Premium Care Diapers — Size 4 (9–14kg) × 52 Count": {
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80",
    ],
  },
  "Baby Trend Expedition Jogger Travel System — Stroller + Infant Car Seat": {
    imageUrl: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=500&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80",
      "https://images.unsplash.com/photo-1542315192-1f61a1792f33?w=500&q=80",
    ],
  },
  "Fisher-Price Kick & Play Piano Gym — Newborn to Toddler": {
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80",
      "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=500&q=80",
      "https://images.unsplash.com/photo-1561702771-c2c8e52ee84d?w=500&q=80",
    ],
  },
};

async function fixImages() {
  console.log("🔧  Fixing broken product image URLs…");
  let updated = 0;

  for (const [name, { imageUrl, images }] of Object.entries(imageUpdates)) {
    const result = await db
      .update(productsTable)
      .set({ imageUrl, images, updatedAt: new Date() })
      .where(eq(productsTable.name, name))
      .returning({ id: productsTable.id, name: productsTable.name });

    if (result.length > 0) {
      console.log(`   ✅  [${result[0]!.id}] ${result[0]!.name}`);
      updated++;
    } else {
      console.warn(`   ⚠️   Not found: "${name}"`);
    }
  }

  console.log(`\n✅  Updated ${updated} / ${Object.keys(imageUpdates).length} products.`);
}

fixImages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Fix failed:", err);
    process.exit(1);
  });
