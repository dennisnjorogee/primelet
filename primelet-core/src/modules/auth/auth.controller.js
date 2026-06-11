import authService from "./auth.service.js";

const login = async (req, res, next) => {
  try {
    //logindata contains emailAddress, password
    const loginData = req.body;

    const { accessToken, refreshToken } = await authService.login(loginData);

    res.cookie("_accesstoken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("_refreshtoken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful.",
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    // registrationData contains firstName, lastName, emailAddress, & password
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
    // destructure verification token
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

export default { login, register, verifyEmail, resendVerifyEmail };
