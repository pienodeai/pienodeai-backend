import type { Request, Response } from "express";
import { getTestimonials } from "../data/index.js";

export async function list(_req: Request, res: Response): Promise<void> {
  const testimonials = await getTestimonials();
  res.json({ data: testimonials });
}
