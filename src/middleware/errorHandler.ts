import type { Request, Response, NextFunction } from "express";
import { logger } from "../logger.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const requestId = (req as Request & { id?: string }).id;
  logger.error(
    { err, requestId, path: req.path, method: req.method },
    "unhandled_error"
  );

  res.status(500).json({
    error: "INTERNAL_ERROR",
    message: "Internal server error",
    requestId,
  });
}
