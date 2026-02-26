import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as faqsController from "../controllers/faqsController.js";

const router = Router();

router.get("/", asyncHandler(faqsController.list));

export default router;
