import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { seedProducts } from "@workspace/db/seed";

const router = Router();

/**
 * POST /api/admin/seed
 * One-time endpoint to seed the production database.
 * Protected by SESSION_SECRET header — remove after seeding.
 */
router.post("/admin/seed", async (req, res) => {
  const secret = req.headers["x-admin-secret"];
  if (!secret || secret !== process.env["SESSION_SECRET"]) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const existing = await db.select().from(productsTable).limit(1);
    if (existing.length > 0) {
      return res.json({ message: "Already seeded", count: existing.length });
    }
    const count = await seedProducts();
    return res.json({ message: "Seeded successfully", count });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});

export default router;
