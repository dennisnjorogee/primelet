import { Router } from "express";
import authController from "./auth.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validationSchema from "../../schemas/validation.schema.js";

const router = Router();

router.post(
  "/login",
  validationMiddleware.login(validationSchema.login),
  authController.login,
);
router.post(
  "/register",
  validationMiddleware.register(validationSchema.signup),
  authController.register,
);
router.post(
  "/verify-email",
  validationMiddleware.verifyEmail(validationSchema.verifyEmail),
  authController.verifyEmail,
);

router.post(
  "/resend-verify-email",
  validationMiddleware.resendVerifyEmail(),
  authController.resendVerifyEmail,
);

router.post(
  "/forgot-password",
  validationMiddleware.forgotPassword(validationSchema.forgotPassword),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  validationMiddleware.resetPassword(validationSchema.resetPassword),
  authController.resetPassword,
);

router.post("/logout", authMiddleware.auth(), authController.logout);

router.post("/refresh", authMiddleware.refresh(), authController.refresh);

export default router;
