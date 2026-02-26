import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import * as contactController from "../controllers/contactController.js";

const router = Router();

router.post("/", asyncHandler(contactController.submit));

export default router;
