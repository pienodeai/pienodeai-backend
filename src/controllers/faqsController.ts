import type { Request, Response } from "express";
import { getFaqs, getFaqsByCategory } from "../data/index.js";
import type { FAQCategory } from "../types/index.js";

const validCategories: FAQCategory[] = ["general", "services", "pricing", "process"];

export async function list(req: Request, res: Response): Promise<void> {
  const category = req.query.category as string | undefined;
  if (category && validCategories.includes(category as FAQCategory)) {
    const faqs = await getFaqsByCategory(category as FAQCategory);
    res.json({ data: faqs });
    return;
  }
  const faqs = await getFaqs();
  res.json({ data: faqs });
}
