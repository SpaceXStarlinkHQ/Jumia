import { Router, type IRouter } from "express";
import crypto from "crypto";
import { eq, inArray } from "drizzle-orm";
import { db, productsTable, ordersTable, orderItemsTable } from "@workspace/db";
import {
  InitiateCheckoutBody,
  InitiateCheckoutResponse,
  VerifyPaymentParams,
  VerifyPaymentResponse,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE = "https://api.paystack.co";

function paystackHeaders() {
  return {
    Authorization: `Bearer ${PAYSTACK_SECRET}`,
    "Content-Type": "application/json",
  };
}

function generateReference(): string {
  return `order_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

router.post("/checkout/initiate", async (req, res): Promise<void> => {
  if (!PAYSTACK_SECRET) {
    res.status(500).json({ error: "Paystack secret key not configured" });
    return;
  }

  const parsed = InitiateCheckoutBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { customerEmail, customerName, items, callbackUrl } = parsed.data;

  // Fetch all products in a single query
  const productIds = items.map((i) => i.productId);
  const fetchedProducts = await db
    .select()
    .from(productsTable)
    .where(inArray(productsTable.id, productIds));

  const productMap = new Map<number, typeof fetchedProducts[0]>();
  for (const p of fetchedProducts) {
    productMap.set(p.id, p);
  }

  // Verify every requested product exists
  for (const pid of productIds) {
    if (!productMap.has(pid)) {
      res.status(400).json({ error: `Product ${pid} not found` });
      return;
    }
  }

  // Calculate total
  let totalKobo = 0;
  for (const item of items) {
    const product = productMap.get(item.productId)!;
    if (product.stock < item.quantity) {
      res
        .status(400)
        .json({ error: `Insufficient stock for "${product.name}"` });
      return;
    }
    totalKobo += product.priceKobo * item.quantity;
  }

  const reference = generateReference();

  // Initialize Paystack transaction
  const paystackRes = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: paystackHeaders(),
    body: JSON.stringify({
      email: customerEmail,
      amount: totalKobo,
      reference,
      callback_url: callbackUrl,
      metadata: { customer_name: customerName },
    }),
  });

  if (!paystackRes.ok) {
    const err = await paystackRes.json().catch(() => ({}));
    req.log.error({ err }, "Paystack initialization failed");
    res.status(502).json({ error: "Payment initialization failed" });
    return;
  }

  const paystackData = (await paystackRes.json()) as {
    data: { authorization_url: string; access_code: string; reference: string };
  };

  // Create order record
  const [order] = await db
    .insert(ordersTable)
    .values({
      customerEmail,
      customerName,
      status: "pending",
      totalKobo,
      paystackReference: reference,
      paystackAccessCode: paystackData.data.access_code,
    })
    .returning();

  // Create order items
  await db.insert(orderItemsTable).values(
    items.map((item) => {
      const product = productMap.get(item.productId)!;
      return {
        orderId: order.id,
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        unitPriceKobo: product.priceKobo,
      };
    })
  );

  req.log.info({ orderId: order.id, reference }, "Checkout initiated");

  res.status(201).json(
    InitiateCheckoutResponse.parse({
      orderId: order.id,
      paystackUrl: paystackData.data.authorization_url,
      reference,
    })
  );
});

router.get("/checkout/verify/:reference", async (req, res): Promise<void> => {
  if (!PAYSTACK_SECRET) {
    res.status(500).json({ error: "Paystack secret key not configured" });
    return;
  }

  const params = VerifyPaymentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { reference } = params.data;

  // Check order exists
  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.paystackReference, reference));

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  // If already marked paid, just return it
  if (order.status === "paid") {
    const items = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.orderId, order.id));
    res.json(VerifyPaymentResponse.parse({ ...order, items }));
    return;
  }

  // Verify with Paystack
  const paystackRes = await fetch(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: paystackHeaders() }
  );

  if (!paystackRes.ok) {
    res.status(502).json({ error: "Payment verification failed" });
    return;
  }

  const paystackData = (await paystackRes.json()) as {
    data: { status: string };
  };

  if (paystackData.data.status !== "success") {
    res.status(400).json({ error: "Payment not successful" });
    return;
  }

  // Mark order as paid
  const [updatedOrder] = await db
    .update(ordersTable)
    .set({ status: "paid", updatedAt: new Date() })
    .where(eq(ordersTable.paystackReference, reference))
    .returning();

  const items = await db
    .select()
    .from(orderItemsTable)
    .where(eq(orderItemsTable.orderId, updatedOrder.id));

  req.log.info({ orderId: updatedOrder.id, reference }, "Payment verified");

  res.json(VerifyPaymentResponse.parse({ ...updatedOrder, items }));
});

// Paystack webhook
router.post("/checkout/webhook", async (req, res): Promise<void> => {
  if (!PAYSTACK_SECRET) {
    res.sendStatus(200);
    return;
  }

  const signature = req.headers["x-paystack-signature"] as string;
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== signature) {
    res.sendStatus(401);
    return;
  }

  const event = req.body as { event: string; data: { reference: string } };

  if (event.event === "charge.success") {
    const { reference } = event.data;
    await db
      .update(ordersTable)
      .set({ status: "paid", updatedAt: new Date() })
      .where(eq(ordersTable.paystackReference, reference));

    logger.info({ reference }, "Webhook: order marked paid");
  }

  res.sendStatus(200);
});

export default router;
