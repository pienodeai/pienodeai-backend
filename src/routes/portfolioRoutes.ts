import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as portfolioController from "../controllers/portfolioController.js";

const router = Router();

router.get("/", asyncHandler(portfolioController.list));
router.get("/:slug", asyncHandler(portfolioController.getBySlug));

export default router;
