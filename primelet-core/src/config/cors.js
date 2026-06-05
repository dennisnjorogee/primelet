import express from "express";
import cors from "cors";

const corsRouter = express.Router();

corsRouter.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

export default corsRouter;
