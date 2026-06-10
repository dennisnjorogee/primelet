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
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
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
    // destructure verification token and user id
    const { verificationToken } = req.body;
    const { userId } = req.user;

    await authService.verifyEmail(verificationToken, userId);

    res.clearCookie("_regt");

    return res.status(200).json({
      status: "success",
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register, verifyEmail };
