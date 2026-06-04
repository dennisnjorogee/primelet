import "./config/env.js";
import app from "./app.js";
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);

  if (process.env.NODE_ENV !== "production") {
    console.log("API DOCS: http://127.0.0.1:5000/api-docs");
  }
});
