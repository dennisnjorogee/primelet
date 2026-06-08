import { Router } from "express";
import { testController } from "./auth.controller.js";
import { login, register } from "./auth.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { signupSchema } from "../../schemas/validation.schema.js";
const router = Router();

router.get("/", testController);
router.post("/login", login);
router.post("/register", validate(signupSchema), register);

export default router;
