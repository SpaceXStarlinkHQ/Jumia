import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name").notNull(),
  status: text("status").notNull().default("pending"), // pending | paid | shipped | delivered | cancelled
  totalKobo: integer("total_kobo").notNull(),
  paystackReference: text("paystack_reference").notNull().unique(),
  paystackAccessCode: text("paystack_access_code"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
