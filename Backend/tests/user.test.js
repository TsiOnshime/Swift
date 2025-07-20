import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { jest } from "@jest/globals";

jest.mock("node-mailjet", () => ({
  apiConnect: () => ({
    post: () => ({
      request: () => Promise.resolve({ body: { Messages: [] } }),
    }),
  }),
}));


describe("User Auth Endpoints", () => {
  beforeAll(async () => {
    // Wait for mongoose to connect (handled by app.js)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/e-scooter-test");
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        fullname: { firstname: "Test", lastname: "User" },
        email: "testuser@example.com",
        password: "password123",
        walletAddress: "wallet123",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Check your email to verify your account.");
  });

  it("should not register with invalid email", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        fullname: { firstname: "Test", lastname: "User" },
        email: "notanemail",
        password: "password123",
        walletAddress: "wallet123",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should not register with missing fields", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        email: "testuser2@example.com",
        password: "password123",
        walletAddress: "wallet123",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should not register with duplicate email", async () => {
    await User.create({
      fullname: { firstname: "Test", lastname: "User" },
      email: "duplicate@example.com",
      password: "hashedpassword",
      walletAddress: "wallet456",
      verified: true,
    });
    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        fullname: { firstname: "Test", lastname: "User" },
        email: "duplicate@example.com",
        password: "password123",
        walletAddress: "wallet789",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Email already in use");
  });

  it("should not login unverified user", async () => {
    await request(app)
      .post("/api/v1/users/register")
      .send({
        fullname: { firstname: "Test", lastname: "User" },
        email: "unverified@example.com",
        password: "password123",
        walletAddress: "wallet999",
      });
    const res = await request(app)
      .post("/api/v1/users/login")
      .send({
        email: "unverified@example.com",
        password: "password123",
      });
  
    expect(res.body).toHaveProperty("message", "Please verify your email before logging in.");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});