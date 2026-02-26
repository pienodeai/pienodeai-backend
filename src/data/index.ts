import { getDb } from "../db/connection.js";
import { COLLECTIONS } from "../db/collections.js";
import type {
  Service,
  CaseStudy,
  TeamMember,
  BlogPost,
  Testimonial,
  FAQ,
  CompanyStats,
} from "../types/index.js";

export async function getServices(): Promise<Service[]> {
  const col = getDb().collection<Service>(COLLECTIONS.services);
  return col.find({}).toArray();
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const col = getDb().collection<Service>(COLLECTIONS.services);
  return col.findOne({ slug });
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const col = getDb().collection<CaseStudy>(COLLECTIONS.caseStudies);
  return col.find({}).toArray();
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const col = getDb().collection<CaseStudy>(COLLECTIONS.caseStudies);
  return col.findOne({ slug });
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const col = getDb().collection<TeamMember>(COLLECTIONS.teamMembers);
  return col.find({}).toArray();
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const col = getDb().collection<Testimonial>(COLLECTIONS.testimonials);
  return col.find({}).toArray();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const col = getDb().collection<BlogPost>(COLLECTIONS.blogPosts);
  return col.find({}).sort({ publishedAt: -1 }).toArray();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const col = getDb().collection<BlogPost>(COLLECTIONS.blogPosts);
  return col.findOne({ slug });
}

export async function getFaqs(): Promise<FAQ[]> {
  const col = getDb().collection<FAQ>(COLLECTIONS.faqs);
  return col.find({}).toArray();
}

export async function getFaqsByCategory(category: FAQ["category"]): Promise<FAQ[]> {
  const col = getDb().collection<FAQ>(COLLECTIONS.faqs);
  return col.find({ category }).toArray();
}

export async function getCompanyStats(): Promise<CompanyStats[]> {
  const col = getDb().collection<CompanyStats>(COLLECTIONS.companyStats);
  return col.find({}).toArray();
}

interface CompanyConfig {
  name: string;
  tagline: string;
  description: string;
  contactInfo: Record<string, string>;
  socialLinks: Record<string, string>;
}

interface ConfigDoc extends CompanyConfig {
  _id: string;
}

export async function getCompanyConfig(): Promise<CompanyConfig> {
  const col = getDb().collection<ConfigDoc>(COLLECTIONS.config);
  const doc = await col.findOne({ _id: "company" });
  if (!doc) {
    return {
      name: "PiNodeAI",
      tagline: "",
      description: "",
      contactInfo: {},
      socialLinks: {},
    };
  }
  const { _id: _, ...rest } = doc;
  return rest;
}

export async function createContactSubmission(data: {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  createdAt: Date;
}): Promise<void> {
  const col = getDb().collection(COLLECTIONS.contactSubmissions);
  await col.insertOne({ ...data, createdAt: data.createdAt ?? new Date() });
}

export async function createNewsletterSubscriber(data: {
  email: string;
  createdAt: Date;
}): Promise<void> {
  const col = getDb().collection(COLLECTIONS.newsletterSubscribers);
  await col.updateOne(
    { email: data.email },
    { $setOnInsert: { email: data.email, createdAt: data.createdAt ?? new Date() } },
    { upsert: true }
  );
}
