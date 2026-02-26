import type { Request, Response } from "express";
import { newsletterSchema } from "../validators/newsletter.js";
import { createNewsletterSubscriber } from "../data/index.js";
import { logger } from "../logger.js";

export async function subscribe(req: Request, res: Response): Promise<void> {
  const result = newsletterSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid request",
      details: result.error.flatten(),
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }

  const { email } = result.data;
  try {
    await createNewsletterSubscriber({ email, createdAt: new Date() });
  } catch (err) {
    logger.error({ err, requestId: (req as Request & { id?: string }).id }, "newsletter_subscription_failed");
    res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Failed to subscribe",
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }

  logger.info(
    { requestId: (req as Request & { id?: string }).id, email },
    "newsletter_subscription"
  );

  res.status(200).json({ message: "Successfully subscribed" });
}
