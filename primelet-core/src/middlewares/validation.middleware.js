import { ZodError } from "zod";
import utils from "../utils/utils.js";

const login = (loginSchema) => {
  return (req, res, next) => {
    try {
      const { emailAddress, password } = req.body || {};

      if (!emailAddress) {
        throw utils.appError("Email address is required", 400);
      }

      if (!password) {
        throw utils.appError("Password cannot be empty", 400);
      }

      const validLoginData = loginSchema.parse(req.body);
      req.body = validLoginData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(utils.appError(error.issues[0].message, 400));
      }

      next(error);
    }
  };
};

const register = (registrationSchema) => {
  return (req, res, next) => {
    try {
      const { firstName, lastName, emailAddress, phoneNumber, password } =
        req.body || {};

      if (!firstName) {
        throw utils.appError("First name is required", 400);
      }

      if (!lastName) {
        throw utils.appError("Last name is required", 400);
      }

      if (!emailAddress) {
        throw utils.appError("Email address is required", 400);
      }

      if (!phoneNumber) {
        throw utils.appError("Phone number is required", 400);
      }

      if (!password) {
        throw utils.appError("Password cannot be empty!", 400);
      }

      const validRegistrationData = registrationSchema.parse(req.body);
      req.body = validRegistrationData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(utils.appError(error.issues[0].message, 400));
      }

      next(error);
    }
  };
};

const verifyEmail = (verifyEmailSchema) => {
  return (req, res, next) => {
    try {
      const { verificationToken } = req.body || {};

      if (!verificationToken) {
        throw utils.appError("Verification token is required", 400);
      }

      const validVerificationToken = verifyEmailSchema.parse(req.body);
      req.body = validVerificationToken;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(utils.appError(error.issues[0].message, 400));
      }

      next(error);
    }
  };
};

export default { login, register, verifyEmail };
