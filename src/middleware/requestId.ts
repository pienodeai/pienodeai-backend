import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";

export interface RequestWithId extends Request {
  id?: string;
}

export function requestId(req: RequestWithId, _res: Response, next: NextFunction): void {
  req.id = req.headers["x-request-id"] as string | undefined ?? randomUUID();
  next();
}
