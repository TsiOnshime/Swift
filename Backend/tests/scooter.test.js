import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import Scooter from "../models/scooter.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

let userToken;
let adminToken;
let scooterId;

beforeAll(async () => {
  // Connect to test DB if not already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/e-scooter-test");
  }

  // Create a user and an admin, and generate tokens
  await User.deleteMany({});
  await Scooter.deleteMany({});

  const user = await User.create({
    fullname: { firstname: "User", lastname: "Test" },
    email: "user@example.com",
    password: "password123",
    walletAddress: "walletUser",
    verified: true,
    role: "user",
  });

  const admin = await User.create({
    fullname: { firstname: "Admin", lastname: "Test" },
    email: "admin@example.com",
    password: "password123",
    walletAddress: "walletAdmin",
    verified: true,
    role: "admin",
  });

  userToken = jwt.sign({ _id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  adminToken = jwt.sign({ _id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Scooter.deleteMany({});
});

describe("Scooter Endpoints", () => {
  it("should create a scooter (admin only)", async () => {
    const res = await request(app)
      .post("/api/v1/scooters")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        qrCode: "SCOOTER123",
        location: { type: "Point", coordinates: [40.0, 9.0] },
        batteryLevel: 100,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("qrCode", "SCOOTER123");
    scooterId = res.body._id;
  });

  it("should not allow non-admin to create a scooter", async () => {
    const res = await request(app)
      .post("/api/v1/scooters")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        qrCode: "SCOOTER456",
        location: { type: "Point", coordinates: [40.0, 9.0] },
        batteryLevel: 100,
      });
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  it("should list all available scooters", async () => {
    await Scooter.create({
      qrCode: "SCOOTER789",
      location: { type: "Point", coordinates: [40.0, 9.0] },
      batteryLevel: 80,
      isAvailable: true,
    });
    const res = await request(app).get("/api/v1/scooters");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update scooter availability (protected)", async () => {
    const scooter = await Scooter.create({
      qrCode: "SCOOTER999",
      location: { type: "Point", coordinates: [40.0, 9.0] },
      batteryLevel: 90,
      isAvailable: true,
    });
    const res = await request(app)
      .patch(`/api/v1/scooters/${scooter._id}/available`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ isAvailable: false });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("isAvailable", false);
  });

  it("should return 404 for non-existent scooter on update", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/v1/scooters/${fakeId}/available`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ isAvailable: false });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Scooter not found");
  });

  it("should get scooter by QR code", async () => {
    await Scooter.create({
      qrCode: "SCOOTERQR",
      location: { type: "Point", coordinates: [40.0, 9.0] },
      batteryLevel: 80,
      isAvailable: true,
    });
    const res = await request(app).get("/api/v1/scooters/qr/SCOOTERQR");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("qrCode", "SCOOTERQR");
  });

  it("should return 404 for non-existent scooter by QR code", async () => {
    const res = await request(app).get("/api/v1/scooters/qr/DOESNOTEXIST");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Scooter not found");
  });
});