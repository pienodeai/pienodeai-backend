import type { Request, Response } from "express";
import { getCaseStudies, getCaseStudyBySlug } from "../data/index.js";

export async function list(_req: Request, res: Response): Promise<void> {
  const caseStudies = await getCaseStudies();
  res.json({ data: caseStudies });
}

export async function getBySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) {
    res.status(404).json({
      error: "NOT_FOUND",
      message: "Case study not found",
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }
  res.json(caseStudy);
}
