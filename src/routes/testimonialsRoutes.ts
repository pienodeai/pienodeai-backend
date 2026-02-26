import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as testimonialsController from "../controllers/testimonialsController.js";

const router = Router();

router.get("/", asyncHandler(testimonialsController.list));

export default router;
