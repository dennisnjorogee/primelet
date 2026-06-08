import { appError } from "../../utils/error.js";
export const testController = (req, res) => {
  return res.status(200).json({ status: "success" });
};

export const login = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const register = (req, res, next) => {
  try {
    const data = req.body || {};

    console.log(data);

    return res
      .status(200)
      .json({ status: "success", message: "Account created successfully" });
  } catch (error) {
    next(error);
  }
};
