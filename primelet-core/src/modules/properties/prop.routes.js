import { Router } from "express";
import propController from "./prop.controller.js";
const router = Router();

// get all properties
router.get("/", propController.getAllProperties);
// get property by slug
router.get("/:slug", propController.getPropertyBySlug);

export default router;
