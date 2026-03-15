import { Router } from "express";
import contactRoutes from "./contactRoutes.js";

const router = Router();

router.use("/contact", contactRoutes);

export default router;
