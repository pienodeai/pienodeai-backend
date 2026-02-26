import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";
import { config } from "../config/index.js";
import { COLLECTIONS } from "../db/collections.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = join(__dirname, "..", "data", "seed.json");
const seed = JSON.parse(readFileSync(seedPath, "utf-8"));

async function run(): Promise<void> {
  const client = new MongoClient(config.mongodbUri);
  await client.connect();
  const db = client.db("pienodeai");

  const services = db.collection(COLLECTIONS.services);
  await services.deleteMany({});
  if (seed.services?.length) {
    await services.insertMany(seed.services);
    console.log(`Inserted ${seed.services.length} services`);
  }

  const caseStudies = db.collection(COLLECTIONS.caseStudies);
  await caseStudies.deleteMany({});
  if (seed.caseStudies?.length) {
    await caseStudies.insertMany(seed.caseStudies);
    console.log(`Inserted ${seed.caseStudies.length} case studies`);
  }

  const teamMembers = db.collection(COLLECTIONS.teamMembers);
  await teamMembers.deleteMany({});
  if (seed.teamMembers?.length) {
    await teamMembers.insertMany(seed.teamMembers);
    console.log(`Inserted ${seed.teamMembers.length} team members`);
  }

  const testimonials = db.collection(COLLECTIONS.testimonials);
  await testimonials.deleteMany({});
  if (seed.testimonials?.length) {
    await testimonials.insertMany(seed.testimonials);
    console.log(`Inserted ${seed.testimonials.length} testimonials`);
  }

  const blogPosts = db.collection(COLLECTIONS.blogPosts);
  await blogPosts.deleteMany({});
  if (seed.blogPosts?.length) {
    await blogPosts.insertMany(seed.blogPosts);
    console.log(`Inserted ${seed.blogPosts.length} blog posts`);
  }

  const faqs = db.collection(COLLECTIONS.faqs);
  await faqs.deleteMany({});
  if (seed.faqs?.length) {
    await faqs.insertMany(seed.faqs);
    console.log(`Inserted ${seed.faqs.length} FAQs`);
  }

  const companyStats = db.collection(COLLECTIONS.companyStats);
  await companyStats.deleteMany({});
  if (seed.companyStats?.length) {
    await companyStats.insertMany(seed.companyStats);
    console.log(`Inserted ${seed.companyStats.length} company stats`);
  }

  const configCol = db.collection(COLLECTIONS.config);
  await configCol.deleteOne({ _id: "company" } as Record<string, unknown>);
  if (seed.company) {
    await configCol.insertOne({ _id: "company", ...seed.company });
    console.log("Inserted company config");
  }

  await client.close();
  console.log("Seed completed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
