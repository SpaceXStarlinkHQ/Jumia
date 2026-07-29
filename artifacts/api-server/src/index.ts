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

// SESSION_SECRET is required — sessions won't work without it
if (!process.env["SESSION_SECRET"]) {
  throw new Error(
    `Required environment variable "SESSION_SECRET" is missing. ` +
      `Set it in the Replit Secrets panel before starting the server.`,
  );
}

// PAYSTACK_SECRET_KEY is needed for payments but not for the rest of the API.
// The checkout routes already return 500 gracefully when it's absent.
if (!process.env["PAYSTACK_SECRET_KEY"]) {
  logger.warn("PAYSTACK_SECRET_KEY is not set — checkout endpoints will be disabled until it is provided.");
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
