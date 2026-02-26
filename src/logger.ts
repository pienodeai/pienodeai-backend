import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: "pie-node-backend",
    env: process.env.NODE_ENV ?? "development",
  },
});

export type Logger = pino.Logger;
