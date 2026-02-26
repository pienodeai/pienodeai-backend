import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/index.js";
import { getDb } from "./db/connection.js";
import { requestId } from "./middleware/requestId.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apiRoutes from "./routes/index.js";
import swaggerSpec from "./swagger.js";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production",
  })
);
app.use(
  cors({
    origin: config.corsOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(requestId);
app.use((req, res, next) => {
  const id = (req as express.Request & { id?: string }).id;
  if (id) res.setHeader("X-Request-ID", id);
  next();
});

app.get("/health/live", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/health/ready", (_req, res) => {
  getDb()
    .admin()
    .ping()
    .then(() => res.status(200).json({ status: "ok" }))
    .catch(() => res.status(503).json({ status: "unhealthy" }));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec as Parameters<typeof swaggerUi.setup>[0]));
app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/v1", apiRoutes);

app.use(errorHandler);

export default app;
