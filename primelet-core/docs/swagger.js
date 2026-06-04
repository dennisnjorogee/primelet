import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Primelet Backend API Documentation",
      version: "1.0.0",
      description: "Primelet Backend API Documentation",
    },
    servers: [
      {
        url: "http://127.0.0.1:5000",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apikey",
          in: "cookie",
          name: "_at",
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["./src/**/*.js"],
};

export default swaggerJSDoc(options);
