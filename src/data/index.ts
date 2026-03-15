import { getDb } from "../db/connection.js";
import { COLLECTIONS } from "../db/collections.js";

export async function createContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  createdAt: Date;
}): Promise<string> {
  const col = getDb().collection(COLLECTIONS.contactSubmissions);
  const result = await col.insertOne({ ...data, createdAt: data.createdAt ?? new Date() });
  return result.insertedId.toString();
}
