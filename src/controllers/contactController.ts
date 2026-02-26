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
  try {
    await createContactSubmission({
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceInterest: data.serviceInterest,
      message: data.message,
      createdAt: new Date(),
    });
  } catch (err) {
    logger.error({ err, requestId: (req as Request & { id?: string }).id }, "contact_submission_failed");
    res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Failed to save message",
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }

  logger.info(
    {
      requestId: (req as Request & { id?: string }).id,
      name: data.name,
      email: data.email,
    },
    "contact_form_submission"
  );

  res.status(200).json({ message: "Message sent successfully" });
}
