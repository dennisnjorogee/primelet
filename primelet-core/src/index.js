import "./config/env.js";
import app from "./app.js";
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);

  console.log("api docs: http://127.0.0.1:5000/api/v1/docs");
});
