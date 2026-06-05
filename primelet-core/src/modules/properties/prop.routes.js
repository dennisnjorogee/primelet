import { Router } from "express";
import { propTest } from "./prop.controller.js";
const router = Router();

router.get("/", propTest);

export default router;
