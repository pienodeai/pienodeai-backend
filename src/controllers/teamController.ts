import type { Request, Response } from "express";
import { getTeamMembers } from "../data/index.js";

export async function list(_req: Request, res: Response): Promise<void> {
  const teamMembers = await getTeamMembers();
  res.json({ data: teamMembers });
}
