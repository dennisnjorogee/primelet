// zod schema
import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";

const login = z.object({
  emailAddress: z
    .string({ error: "Email address is required" })
    .email("Invalid email address")
    .toLowerCase(),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password cannot be empty"),
});

const signup = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .trim()
    .min(1, "First name is required"),
  lastName: z
    .string({ error: "Last name is required" })
    .trim()
    .min(1, "Last name is required"),
  emailAddress: z
    .string({ error: "Email address is required" })
    .email("Invalid email address")
    .toLowerCase(),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const verifyEmail = z.object({
  verificationToken: z
    .string({
      error: "Verification token is required",
    })
    .trim()
    .min(1, "Verification token is required"),
});

export default { login, signup, verifyEmail };
