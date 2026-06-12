export const paths = {
  "/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "User login",
      description: "Authenticate user with email and password",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TokenResponse" },
            },
          },
        },
        401: {
          description: "Invalid email or password",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "User registration",
      description: "Create a new user account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SignupRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TokenResponse" },
            },
          },
        },
        409: {
          description: "Email already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/verify-email": {
    post: {
      tags: ["Authentication"],
      summary: "Verify email address",
      description: "Verify user email using verification token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/VerifyEmailRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Email verified successfully",
        },
        400: {
          description: "Invalid or expired verification token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/resend-verify-email": {
    post: {
      tags: ["Authentication"],
      summary: "Resend verification email",
      description: "Resend email verification link to user",
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "Verification email resent",
        },
        400: {
          description: "Email already verified",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/forgot-password": {
    post: {
      tags: ["Authentication"],
      summary: "Request password reset",
      description: "Send password reset email",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ForgotPasswordRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Password reset email sent",
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/reset-password": {
    post: {
      tags: ["Authentication"],
      summary: "Reset password",
      description: "Set new password using reset token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Password reset successfully",
        },
        400: {
          description: "Invalid or expired reset token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/logout": {
    post: {
      tags: ["Authentication"],
      summary: "User logout",
      description: "Logout current user",
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "Logout successful",
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/auth/refresh": {
    post: {
      tags: ["Authentication"],
      summary: "Refresh access token",
      description: "Get new access token using refresh token",
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "Token refreshed",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TokenResponse" },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/properties": {
    get: {
      tags: ["Properties"],
      summary: "Get all properties",
      description: "Retrieve list of all properties",
      responses: {
        200: {
          description: "Properties retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", enum: ["success"] },
                },
              },
            },
          },
        },
      },
    },
  },
};
