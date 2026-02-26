import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as statsController from "../controllers/statsController.js";

const router = Router();

router.get("/", asyncHandler(statsController.list));

export default router;
