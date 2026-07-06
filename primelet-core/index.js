import "./src/config/env.js";
import app from "./src/app.js";
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);

  console.log("api docs: http://127.0.0.1:5000/api/v1/docs");
});
