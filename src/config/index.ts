const rawPort = process.env.PORT ?? "4000";
const port = parseInt(rawPort, 10);
if (Number.isNaN(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT: ${rawPort}`);
}

const corsOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  throw new Error("MONGODB_URI environment variable is required");
}

export const config = {
  port,
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigins: corsOrigins.length > 0 ? corsOrigins : ["http://localhost:3000"],
  isProduction: process.env.NODE_ENV === "production",
  mongodbUri,
} as const;
