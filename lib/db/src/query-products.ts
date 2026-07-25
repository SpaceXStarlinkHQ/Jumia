import { db, productsTable } from "./index.js";
import { asc } from "drizzle-orm";

const rows = await db
  .select({
    id: productsTable.id,
    name: productsTable.name,
    category: productsTable.category,
    imageUrl: productsTable.imageUrl,
  })
  .from(productsTable)
  .orderBy(asc(productsTable.id));

for (const r of rows) {
  console.log(r.id, JSON.stringify(r.name), r.category, r.imageUrl?.substring(0, 90));
}
process.exit(0);
