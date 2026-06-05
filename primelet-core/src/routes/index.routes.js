import { Router } from "express";
import propRoutes from "../modules/properties/prop.routes.js";
const router = Router();

router.use("/properties", propRoutes);

export default router;
