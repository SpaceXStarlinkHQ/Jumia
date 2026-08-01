import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

function resolveConnectionString(): string {
  const candidates = [
    process.env.APP_DATABASE_URL,
    process.env.DATABASE_URL,
  ];

  for (const url of candidates) {
    if (url && (url.startsWith("postgres://") || url.startsWith("postgresql://"))) {
      return url;
    }
  }

  // Fall back to individual PG* env vars (Replit-managed PostgreSQL)
  const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;
  if (PGHOST && PGUSER && PGDATABASE) {
    const port = PGPORT ?? "5432";
    const pw = PGPASSWORD ? encodeURIComponent(PGPASSWORD) : "";
    return `postgresql://${PGUSER}:${pw}@${PGHOST}:${port}/${PGDATABASE}`;
  }

  throw new Error(
    "No valid PostgreSQL connection string found. Set APP_DATABASE_URL, DATABASE_URL, or ensure PGHOST/PGUSER/PGDATABASE are available.",
  );
}

const connectionString = resolveConnectionString();

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

export * from "./schema";
