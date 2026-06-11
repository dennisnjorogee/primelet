// utility functions
import crypto from "crypto";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

const appError = (message, statusCode, errors = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  error.isAppError = true;
  return error;
};

const signAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, secret, { expiresIn: "1h" });
};

const signRefreshToken = (userId) => {
  return jwt.sign({ sub: userId }, secret, { expiresIn: "7d" });
};

const signRegistrationToken = (userId) => {
  return jwt.sign({ sub: userId }, secret, { expiresIn: "30d" });
};

const decodeRegistrationToken = (registrationToken) => {
  const decoded = jwt.verify(registrationToken, process.env.JWT_SECRET);

  return decoded.sub;
};

const generateVerificationToken = () => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenHash = crypto.hash("sha256", verificationToken, "hex");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  return { verificationToken, verificationTokenHash, expiresAt };
};

export default {
  appError,
  signAccessToken,
  signRefreshToken,
  signRegistrationToken,
  decodeRegistrationToken,
  generateVerificationToken,
};
