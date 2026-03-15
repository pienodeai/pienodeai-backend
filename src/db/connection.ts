import { MongoClient, type Db } from "mongodb";
import { config } from "../config/index.js";
import { logger } from "../logger.js";

let client: MongoClient | null = null;
let db: Db | null = null;

const DB_NAME = "pienodeai";

export async function connect(): Promise<Db> {
  if (db) return db;
  const uri = config.mongodbUri.trim();
  const separator = uri.includes("?") ? "&" : "?";
  const resolvedUri = uri.includes("retryWrites=true")
    ? uri
    : `${uri}${separator}retryWrites=true&w=majority`;

  client = new MongoClient(resolvedUri, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  });
  await client.connect();
  db = client.db(DB_NAME);
  logger.info({ database: DB_NAME }, "mongodb_connected");
  return db;
}

export function getDb(): Db {
  if (!db) throw new Error("Database not connected. Call connect() first.");
  return db;
}

export async function close(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    logger.info("mongodb_disconnected");
  }
}
