import cors from "cors";
const corsMiddleware = cors({
  origin:
    process.env.NODE_ENV === "production"
      ? [process.env.FRONTEND_URL, process.env.DEV_FRONTEND_URL]
      : [process.env.DEV_FRONTEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

export default corsMiddleware;
