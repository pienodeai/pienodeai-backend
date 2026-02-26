import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as blogController from "../controllers/blogController.js";

const router = Router();

router.get("/", asyncHandler(blogController.list));
router.get("/:slug", asyncHandler(blogController.getBySlug));

export default router;
