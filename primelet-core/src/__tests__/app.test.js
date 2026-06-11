import request from "supertest";
import app from "../app.js";

describe("App routes", () => {
  it("should return 200 for /api/v1/properties", async () => {
    const response = await request(app).get("/api/v1/properties");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "success" });
  });
});
