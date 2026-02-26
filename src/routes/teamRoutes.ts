import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as teamController from "../controllers/teamController.js";

const router = Router();

router.get("/", asyncHandler(teamController.list));

export default router;
