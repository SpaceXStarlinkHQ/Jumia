import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// Allow the Vercel frontend and custom domain to reach the API.
// FRONTEND_URL: comma-separated list of allowed origins, e.g.
//   https://bigdealsnigeria.shop,https://www.bigdealsnigeria.shop
const FRONTEND_URL = process.env["FRONTEND_URL"];
const allowedOrigins: (string | RegExp)[] = [
  /\.vercel\.app$/,
  /\.replit\.app$/,
  /\.replit\.dev$/,
  /localhost/,
  "https://bigdealsnigeria.shop",
  "https://www.bigdealsnigeria.shop",
];
if (FRONTEND_URL) {
  FRONTEND_URL.split(",")
    .map((u) => u.trim())
    .filter(Boolean)
    .forEach((u) => {
      if (!allowedOrigins.includes(u)) allowedOrigins.push(u);
    });
}
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Redirect bare root to the storefront (dev: in-Replit, prod: Vercel URL)
app.get("/", (_req, res) => {
  res.redirect(301, FRONTEND_URL ?? "/store/");
});

// Browser auto-requests /favicon.ico from the domain root.
// Redirect it to the store's actual SVG favicon so the browser tab icon works.
app.get("/favicon.ico", (_req, res) => {
  res.redirect(302, "/store/favicon.svg");
});

// Global JSON error handler — must have exactly 4 parameters.
// Express 5 automatically forwards unhandled async errors here.
// Without this, Express falls back to its default HTML error page,
// which causes the frontend API client to throw a ResponseParseError.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const rawStatus =
    typeof err === "object" && err !== null
      ? Number((err as Record<string, unknown>)["status"] ?? (err as Record<string, unknown>)["statusCode"] ?? 500)
      : 500;
  const status = Number.isFinite(rawStatus) && rawStatus >= 400 && rawStatus < 600 ? rawStatus : 500;
  const message = err instanceof Error ? err.message : "Internal server error";
  logger.error({ err }, "Unhandled route error");
  if (!res.headersSent) {
    res.status(status).json({ error: message });
  }
});

export default app;
