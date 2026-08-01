import { defineConfig } from "drizzle-kit";
import path from "path";

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

  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

const url = resolveConnectionString();

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: { url },
});
