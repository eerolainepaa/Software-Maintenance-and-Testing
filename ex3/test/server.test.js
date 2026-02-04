const request = require("supertest");
const expect = require("chai").expect;

process.env.NODE_ENV = "test"; // ensure server exports app
const app = require("../src/server");

/**
 * Integration tests for the Hex to RGB REST API.
 * Uses Supertest for HTTP requests and Chai for assertions.
 */
describe("Hex to RGB API", () => {
  /**
   * Test the root route.
   * Expects HTTP status 200 and a simple response message.
   */
  it("responds to the root route", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
  });

  /**
   * Test the /hex-to-rgb route with valid hex input.
   * Expects HTTP status 200 and correct RGB JSON response.
   */
  it("converts hex to RGB via API", async () => {
    const res = await request(app)
      .get("/hex-to-rgb?hex=FFAABB");

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      r: 255,
      g: 170,
      b: 187
    });
  });

  /**
   * Test the /hex-to-rgb route with invalid hex input.
   * Expects HTTP status 400 and an error response.
   */
  it("returns error for invalid hex input", async () => {
    const res = await request(app)
      .get("/hex-to-rgb?hex=BADHEX");

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error");
  });
});
