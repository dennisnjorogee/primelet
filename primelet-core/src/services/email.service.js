import { Resend } from "resend";
import emailTemplates from "../templates/email.templates.js";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : {
      emails: {
        send: async () => {
          if (process.env.NODE_ENV === "test") {
            return { id: "test-email" };
          }
          throw new Error("Missing Resend API key");
        },
      },
    };

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : process.env.DEV_FRONTEND_URL;

const verifyEmail = async (emailAddress, fullName, verificationToken) => {
  const verificationLink = `${BASE_URL}/verify?token=${verificationToken}`;

  try {
    await resend.emails.send({
      from: "Primelet <onboarding@resend.dev>",
      to: emailAddress,
      subject: "Verify your Email address",
      html: emailTemplates.verifyEmail(fullName, verificationLink),
    });
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (emailAddress, fullName, resetToken) => {
  const verificationLink = `${BASE_URL}/forgot?token=${resetToken}`;

  try {
    await resend.emails.send({
      from: "Primelet <onboarding@resend.dev>",
      to: emailAddress,
      subject: "Reset your password",
      html: emailTemplates.forgotPassword(fullName, verificationLink),
    });
  } catch (error) {
    throw error;
  }
};

export default { verifyEmail, forgotPassword };
