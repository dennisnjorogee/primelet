// utility functions
import crypto from "crypto";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

const appError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.isAppError = true;
  return error;
};

const signAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, secret, { expiresIn: "1h" });
};

const signRefreshToken = (userId) => {
  return jwt.sign({ sub: userId }, secret, { expiresIn: "7d" });
};

const generateVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  return { token, expiresAt };
};

export default {
  appError,
  signAccessToken,
  signRefreshToken,
  generateVerificationToken,
};
