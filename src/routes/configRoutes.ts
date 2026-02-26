import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as configController from "../controllers/configController.js";

const router = Router();

router.get("/", asyncHandler(configController.get));

export default router;
