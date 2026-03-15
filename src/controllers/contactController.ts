import type { Request, Response } from "express";
import { contactSchema } from "../validators/contact.js";
import { createContactSubmission } from "../data/index.js";
import { logger } from "../logger.js";

export async function submit(req: Request, res: Response): Promise<void> {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid request",
      details: result.error.flatten(),
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }

  const data = result.data;
  let leadId: string;
  try {
    leadId = await createContactSubmission({
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceInterest: data.serviceInterest,
      message: data.message,
      createdAt: new Date(),
    });
  } catch (err) {
    logger.error({ err, requestId: (req as Request & { id?: string }).id }, "lead_creation_failed");
    res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Failed to save lead",
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }

  logger.info(
    {
      requestId: (req as Request & { id?: string }).id,
      leadId,
      name: data.name,
      email: data.email,
    },
    "lead_created"
  );

  res.status(201).json({ message: "Lead created successfully", id: leadId });
}
