import { Router } from "express";
import servicesRoutes from "./servicesRoutes.js";
import portfolioRoutes from "./portfolioRoutes.js";
import blogRoutes from "./blogRoutes.js";
import teamRoutes from "./teamRoutes.js";
import testimonialsRoutes from "./testimonialsRoutes.js";
import faqsRoutes from "./faqsRoutes.js";
import statsRoutes from "./statsRoutes.js";
import configRoutes from "./configRoutes.js";
import contactRoutes from "./contactRoutes.js";
import newsletterRoutes from "./newsletterRoutes.js";

const router = Router();

router.use("/services", servicesRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/blog", blogRoutes);
router.use("/team", teamRoutes);
router.use("/testimonials", testimonialsRoutes);
router.use("/faqs", faqsRoutes);
router.use("/stats", statsRoutes);
router.use("/config", configRoutes);
router.use("/contact", contactRoutes);
router.use("/newsletter", newsletterRoutes);

export default router;
