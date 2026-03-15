import "dotenv/config";
import { MongoClient } from "mongodb";
import { config } from "../config/index.js";
import { COLLECTIONS } from "../db/collections.js";

async function run(): Promise<void> {
  const client = new MongoClient(config.mongodbUri);
  await client.connect();
  const db = client.db("pienodeai");

  // Ensure contact_submissions collection exists (MongoDB creates on first insert)
  await db.collection(COLLECTIONS.contactSubmissions).find({}).limit(1).toArray();

  await client.close();
  console.log("Seed completed (contact_submissions collection ready).");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
