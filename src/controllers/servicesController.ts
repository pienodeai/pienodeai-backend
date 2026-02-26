import type { Request, Response } from "express";
import { getServices, getServiceBySlug } from "../data/index.js";

export async function list(_req: Request, res: Response): Promise<void> {
  const services = await getServices();
  res.json({ data: services });
}

export async function getBySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    res.status(404).json({
      error: "NOT_FOUND",
      message: "Service not found",
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }
  res.json(service);
}
