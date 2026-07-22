import express, { type Express } from "express";
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
// Allow the Vercel frontend (and the in-Replit dev proxy) to reach the API.
// FRONTEND_URL should be the full Vercel origin, e.g. https://my-store.vercel.app
const FRONTEND_URL = process.env["FRONTEND_URL"];
app.use(
  cors({
    origin: FRONTEND_URL
      ? [FRONTEND_URL, /\.vercel\.app$/, /localhost/]
      : true, // allow all in dev
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

export default app;
