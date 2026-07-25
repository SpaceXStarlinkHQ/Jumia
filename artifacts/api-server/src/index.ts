import app from "./app";
import { logger } from "./lib/logger";

// Validate required environment variables at startup so misconfiguration
// surfaces immediately rather than failing silently during a user request.
const REQUIRED_ENV_VARS = ["APP_DATABASE_URL", "PAYSTACK_SECRET_KEY", "SESSION_SECRET"] as const;
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
