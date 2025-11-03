import request from "supertest";
import app from "../server.js";

describe("GET /api/recipes", () => {
  it("should return a list of recipes", async () => {
    const res = await request(app).get("/api/recipes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
