import app from "./app";
import { logger } from "./lib/logger";

// Validate required environment variables at startup so misconfiguration
// surfaces immediately rather than failing silently during a user request.
// Either APP_DATABASE_URL or the runtime-managed DATABASE_URL must be present
if (!process.env["APP_DATABASE_URL"] && !process.env["DATABASE_URL"]) {
  throw new Error(
    `A database connection is required. Set APP_DATABASE_URL in the Replit Secrets panel before starting the server.`,
  );
}

const REQUIRED_ENV_VARS = ["PAYSTACK_SECRET_KEY", "SESSION_SECRET"] as const;
for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    throw new Error(
      `Required environment variable "${key}" is missing. ` +
        `Set it in the Replit Secrets panel before starting the server.`,
    );
  }
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
