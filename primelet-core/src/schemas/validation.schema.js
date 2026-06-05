import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";

export const signupSchema = z.object({
  firstName: z.string().trim().min(1, "Firstname is required"),
  lastName: z.string().trim().min(1, "Lastname is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().transform((val, ctx) => {
    const phone = parsePhoneNumberFromString(val, {
      defaultCountry: "KE",
      extract: false,
    });

    if (!phone || !phone.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number",
      });
      return z.NEVER;
    }

    return phone.format("E.164").replace("+", "");
  }),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
