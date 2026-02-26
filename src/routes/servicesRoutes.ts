import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as servicesController from "../controllers/servicesController.js";

const router = Router();

router.get("/", asyncHandler(servicesController.list));
router.get("/:slug", asyncHandler(servicesController.getBySlug));

export default router;
