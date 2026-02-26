import type { Request, Response } from "express";
import { getCompanyConfig } from "../data/index.js";

export async function get(_req: Request, res: Response): Promise<void> {
  const config = await getCompanyConfig();
  res.json(config);
}
