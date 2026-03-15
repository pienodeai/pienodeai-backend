import "dotenv/config";
import app from "./app.js";
import { config } from "./config/index.js";
import { logger } from "./logger.js";
import { connect, close } from "./db/connection.js";

async function start(): Promise<void> {
  await connect();
  const server = app.listen(config.port, () => {
    logger.info(
      { port: config.port, env: config.nodeEnv },
      "server_started"
    );
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      logger.error(
        { port: config.port },
        `Port ${config.port} is already in use. Kill the other process or set PORT to a different value (e.g. PORT=4001).`
      );
    } else {
      logger.error({ err }, "server_error");
    }
    process.exit(1);
  });

  server.timeout = 30000;
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

  function gracefulShutdown(signal: string): void {
    logger.info({ signal }, "shutdown_signal_received");
    server.close(async () => {
      await close();
      logger.info("server_closed");
      process.exit(0);
    });
  }

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
}

start().catch((err) => {
  logger.error({ err }, "server_start_failed");
  process.exit(1);
});
