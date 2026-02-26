import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as newsletterController from "../controllers/newsletterController.js";

const router = Router();

router.post("/", asyncHandler(newsletterController.subscribe));

export default router;
