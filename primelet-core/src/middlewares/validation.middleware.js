import { ZodError } from "zod";
import { appError } from "../utils/error.js";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { firstName, lastName, emailAddress, phoneNumber, password } =
        req.body || {};

      if (!firstName) {
        throw appError("First name is required", 400);
      }

      if (!lastName) {
        throw appError("Last name is required", 400);
      }

      if (!emailAddress) {
        throw appError("Email address is required", 400);
      }

      if (!phoneNumber) {
        throw appError("Phone number is required", 400);
      }

      if (!password) {
        throw appError("Password cannot be empty!", 400);
      }
      const validData = schema.parse(req.body);
      req.body = validData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues);
        return next(appError(error.issues[0].message, 400));
      }

      next(error);
    }
  };
};
