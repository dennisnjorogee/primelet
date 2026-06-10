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
      message: "Login was successful",
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    // registrationData contains firstName, lastName, emailAddress, phoneNumber & password
    const registrationData = req.body;

    await authService.register(registrationData);

    return res
      .status(200)
      .json({ status: "success", message: "Account created successfully" });
  } catch (error) {
    next(error);
  }
};

export default { login, register };
