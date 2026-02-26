export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  client: string;
  clientTestimonial?: { name: string; role: string; quote: string };
  technologies: string[];
  services: string[];
  category: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: { linkedin?: string; twitter?: string; github?: string };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: { name: string; image: string };
  publishedAt: string;
  image: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export type FAQCategory = "general" | "services" | "pricing" | "process";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export interface CompanyStats {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface ApiError {
  error: string;
  message: string;
  details?: unknown;
  requestId?: string;
}
