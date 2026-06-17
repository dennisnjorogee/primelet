import swaggerJSDoc from "swagger-jsdoc";
import { paths, components as openApiComponents } from "../src/docs/openapi.js";

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
    paths,
    components: {
      ...openApiComponents,
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
  apis: [],
};

export default swaggerJSDoc(options);
