export const components = {
  schemas: {
    User: {
      type: "object",
      properties: {
        id: { type: "integer" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        emailAddress: { type: "string", format: "email" },
        emailVerified: { type: "integer" },
      },
    },
    LoginRequest: {
      type: "object",
      required: ["emailAddress", "password"],
      properties: {
        emailAddress: { type: "string", format: "email" },
        password: { type: "string", minLength: 8 },
      },
    },
    SignupRequest: {
      type: "object",
      required: ["firstName", "lastName", "emailAddress", "password"],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        emailAddress: { type: "string", format: "email" },
        password: { type: "string", minLength: 8 },
      },
    },
    VerifyEmailRequest: {
      type: "object",
      required: ["verificationToken"],
      properties: {
        verificationToken: { type: "string" },
      },
    },
    ForgotPasswordRequest: {
      type: "object",
      required: ["emailAddress"],
      properties: {
        emailAddress: { type: "string", format: "email" },
      },
    },
    ResetPasswordRequest: {
      type: "object",
      required: ["resetToken", "newPassword"],
      properties: {
        resetToken: { type: "string" },
        newPassword: { type: "string", minLength: 8 },
      },
    },
    TokenResponse: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["success", "fail", "error"] },
        token: { type: "string" },
      },
    },
    Property: {
      type: "object",
      properties: {
        id: { type: "integer" },
        slug: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        beds: { type: "integer" },
        bath: { type: "integer" },
        parking: { type: "integer" },
        county: { type: "string" },
        imageUrl: { type: "string" },
      },
    },
    PropertyListResponse: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            properties: {
              type: "array",
              items: { $ref: "#/components/schemas/Property" },
            },
          },
        },
      },
    },
    PropertyResponse: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            property: { $ref: "#/components/schemas/Property" },
          },
        },
      },
    },
    ErrorResponse: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["fail", "error"] },
        message: { type: "string" },
        errors: { type: "object" },
      },
    },
  },
};

export const paths = {
  "/api/v1/auth/login": {
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
  "/api/v1/auth/register": {
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
  "/api/v1/auth/verify-email": {
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
  "/api/v1/auth/resend-verify-email": {
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
  "/api/v1/auth/forgot-password": {
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
  "/api/v1/auth/reset-password": {
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
  "/api/v1/auth/logout": {
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
  "/api/v1/auth/refresh": {
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
  "/api/v1/properties": {
    get: {
      tags: ["Properties"],
      summary: "Get all properties",
      description: "Retrieve a list of properties with optional filters",
      parameters: [
        {
          name: "minPrice",
          in: "query",
          schema: { type: "number" },
          description: "Minimum property price",
        },
        {
          name: "maxPrice",
          in: "query",
          schema: { type: "number" },
          description: "Maximum property price",
        },
        {
          name: "beds",
          in: "query",
          schema: { type: "integer" },
          description: "Number of bedrooms",
        },
        {
          name: "bath",
          in: "query",
          schema: { type: "integer" },
          description: "Number of bathrooms",
        },
        {
          name: "parking",
          in: "query",
          schema: { type: "integer" },
          description: "Number of parking spaces",
        },
        {
          name: "county",
          in: "query",
          schema: { type: "string" },
          description: "County filter",
        },
      ],
      responses: {
        200: {
          description: "Properties retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PropertyListResponse" },
            },
          },
        },
        404: {
          description: "No properties found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/properties/suggestions": {
    get: {
      tags: ["Properties"],
      summary: "Get suggested properties",
      description: "Retrieve a list of random property suggestions",
      responses: {
        200: {
          description: "Suggested properties retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PropertyListResponse" },
            },
          },
        },
        404: {
          description: "No suggested properties found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/properties/{slug}": {
    get: {
      tags: ["Properties"],
      summary: "Get property by slug",
      description: "Retrieve a single property using its unique slug",
      parameters: [
        {
          name: "slug",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Unique property slug",
        },
      ],
      responses: {
        200: {
          description: "Property retrieved successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PropertyResponse" },
            },
          },
        },
        404: {
          description: "Property not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};
