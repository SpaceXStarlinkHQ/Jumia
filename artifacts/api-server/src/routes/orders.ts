import { Router, type IRouter } from "express";
import { eq, and, type SQL } from "drizzle-orm";
import { db, ordersTable, orderItemsTable } from "@workspace/db";
import {
  ListOrdersQueryParams,
  ListOrdersResponse,
  GetOrderParams,
  GetOrderResponse,
  GetOrderByReferenceParams,
  GetOrderByReferenceResponse,
  UpdateOrderStatusParams,
  UpdateOrderStatusBody,
  UpdateOrderStatusResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function fetchOrderWithItems(orderId: number) {
  const rows = await db
    .select()
    .from(ordersTable)
    .leftJoin(orderItemsTable, eq(orderItemsTable.orderId, ordersTable.id))
    .where(eq(ordersTable.id, orderId));

  if (rows.length === 0) return null;

  const order = rows[0].orders;
  const items = rows
    .filter((r) => r.order_items !== null)
    .map((r) => r.order_items!);

  return { ...order, items };
}

// Requires ?email= — prevents listing every customer's orders without auth
router.get("/orders", async (req, res): Promise<void> => {
  const query = ListOrdersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  if (!query.data.email) {
    res.status(400).json({ error: "email query parameter is required" });
    return;
  }

  const conditions: SQL[] = [
    eq(ordersTable.customerEmail, query.data.email),
  ];
  if (query.data.status) {
    conditions.push(eq(ordersTable.status, query.data.status));
  }

  const orders = await db
    .select()
    .from(ordersTable)
    .where(and(...conditions))
    .orderBy(ordersTable.createdAt);

  res.json(ListOrdersResponse.parse(orders));
});

router.get("/orders/reference/:reference", async (req, res): Promise<void> => {
  const params = GetOrderByReferenceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const rows = await db
    .select()
    .from(ordersTable)
    .leftJoin(orderItemsTable, eq(orderItemsTable.orderId, ordersTable.id))
    .where(eq(ordersTable.paystackReference, params.data.reference));

  if (rows.length === 0) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  const order = rows[0].orders;
  const items = rows
    .filter((r) => r.order_items !== null)
    .map((r) => r.order_items!);

  res.json(GetOrderByReferenceResponse.parse({ ...order, items }));
});

router.get("/orders/:id", async (req, res): Promise<void> => {
  const params = GetOrderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const orderWithItems = await fetchOrderWithItems(params.data.id);
  if (!orderWithItems) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(GetOrderResponse.parse(orderWithItems));
});

router.patch("/orders/:id/status", async (req, res): Promise<void> => {
  const params = UpdateOrderStatusParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateOrderStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [order] = await db
    .update(ordersTable)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(eq(ordersTable.id, params.data.id))
    .returning();

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(UpdateOrderStatusResponse.parse(order));
});

export default router;
