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
