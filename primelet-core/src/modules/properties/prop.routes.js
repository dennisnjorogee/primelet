import { Router } from "express";
import propController from "./prop.controller.js";
const router = Router();

// get all properties
router.get("/", propController.getAllProperties);
// get suggestions
router.get("/suggestions", propController.getSuggestions);
// get property by slug
router.get("/:slug", propController.getPropertyBySlug);

export default router;
