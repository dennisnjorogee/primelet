import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import corsRouter from "./config/cors.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../docs/swagger.js";
import routes from "./routes/index.routes.js";
import { apiHealthCheck } from "./modules/system/system.controller.js";

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(corsRouter);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);
app.use("/", apiHealthCheck);

app.use((error, req, res, next) => {
  if (error.isAppError) {
    return res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  }

  console.error("CRITICAL SYSTEM ERROR:", error);

  return res.status(500).json({
    status: "error",
    message: "Something went completely wrong on our end.",
  });
});

export default app;
