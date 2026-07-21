import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, productsTable, ordersTable } from "@workspace/db";
import { GetStoreSummaryResponse, ListCategoriesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/store/summary", async (_req, res): Promise<void> => {
  const [productCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productsTable);

  const [orderCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(ordersTable);

  const [revenueRow] = await db
    .select({ total: sql<number>`coalesce(sum(total_kobo), 0)::int` })
    .from(ordersTable)
    .where(eq(ordersTable.status, "paid"));

  const [paidRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(ordersTable)
    .where(eq(ordersTable.status, "paid"));

  const [pendingRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(ordersTable)
    .where(eq(ordersTable.status, "pending"));

  res.json(
    GetStoreSummaryResponse.parse({
      totalProducts: productCount?.count ?? 0,
      totalOrders: orderCount?.count ?? 0,
      totalRevenueKobo: revenueRow?.total ?? 0,
      paidOrders: paidRow?.count ?? 0,
      pendingOrders: pendingRow?.count ?? 0,
    })
  );
});

router.get("/store/categories", async (_req, res): Promise<void> => {
  const rows = await db
    .selectDistinct({ category: productsTable.category })
    .from(productsTable)
    .orderBy(productsTable.category);

  res.json(ListCategoriesResponse.parse(rows.map((r) => r.category)));
});

export default router;
