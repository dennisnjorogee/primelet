import { Router } from "express";
import { dbConnectionCheck, apiHealthCheck } from "./system.controller.js";
const router = Router();

router.get("/db-test", dbConnectionCheck);
router.get("/api-check", apiHealthCheck);

export default router;
