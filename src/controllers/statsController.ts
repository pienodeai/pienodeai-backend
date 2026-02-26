import type { Request, Response } from "express";
import { getCompanyStats } from "../data/index.js";

export async function list(_req: Request, res: Response): Promise<void> {
  const stats = await getCompanyStats();
  res.json({ data: stats });
}
