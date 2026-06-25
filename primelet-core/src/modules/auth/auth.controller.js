import authService from "./auth.service.js";
import pool from "../../config/db.js";
import utils from "../../utils/utils.js";

const login = async (req, res, next) => {
  try {
    const loginData = req.body;

    const { accessToken, refreshToken, user } = await authService.login(loginData);

    res.cookie("_accesstoken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      path: "/", 
    });

    res.cookie("_refreshtoken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/", 
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      user
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const registrationData = req.body;

    const registrationToken = await authService.register(registrationData);

    res.cookie("_regt", registrationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(201).json({
      status: "success",
      message:
        "Account created successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.body;

    await authService.verifyEmail(verificationToken);

    res.clearCookie("_regt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      status: "success",
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { userId } = req.user;

    await authService.resendVerifyEmail(userId);

    return res.status(200).json({
      status: "success",
      message:
        "A new verification link has been sent to your email. Please check your inbox.",
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { emailAddress } = req.body;

    await authService.forgotPassword(emailAddress);

    return res.status(201).json({
      status: "success",
      message:
        "If an account with that email exists, a reset link has been sent",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;

    await authService.resetPassword(resetToken, password);

    return res.status(200).json({
      status: "success",
      message: "Your password has been reset",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user?.id; 

    if (userId) {
      await authService.logout(userId);
    }

    res.clearCookie("_accesstoken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.clearCookie("_refreshtoken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.status(200).json({
      status: "success",
      message: "Successfully logged out",
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { accessToken, newRefreshToken } = await authService.refresh(
      req.refreshToken,
    );

    // set cookies
    res.cookie("_accesstoken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("_refreshtoken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    const [rows] = await pool.execute(
      `SELECT id, first_name, last_name, email_address, profile_image, email_verified
       FROM users WHERE id = ?`,
      [userId]
    );

    if (rows.length === 0) throw utils.appError("User not found", 404);

    const u = rows[0];

    return res.status(200).json({
      status: "success",
      user: {
        id:            u.id,
        firstName:     u.first_name,
        lastName:      u.last_name,
        emailAddress:  u.email_address,
        profileImage:  u.profile_image ?? null,
        emailVerified: u.email_verified === 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  register,
  verifyEmail,
  resendVerifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  refresh,
  getMe
};
