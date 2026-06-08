import { Router } from "express";
import propRoutes from "../modules/properties/prop.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import systemRoutes from "../modules/system/system.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/properties", propRoutes);

// Health check routes
router.use("/", systemRoutes);

export default router;
