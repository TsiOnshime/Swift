
const crypto = require("crypto");
const mailjet = require("node-mailjet");
require("dotenv").config();
const userModel = require("../models/user.model");

const mailjetClient = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

module.exports.createUser = async ({ fullname, email, password }) => {
  console.log("Received data:", { fullname, email, password });

  if (!fullname || !fullname.firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports.registerUser = async (data) => {
  const { fullname, email, password } = data;
  console.log("Received data:", { fullname, email, password });

  if (!fullname || !fullname.firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  const existing = await userModel.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await userModel.hashPassword(password);
  const token = crypto.randomBytes(32).toString("hex");

  const user = await userModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashedPassword,
    verificationToken: token,
  });

  const verifyUrl = `${process.env.FRONTEND_BASE_URL}/verify-email?token=${token}&email=${email}`;


  try {
    const request = await mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "Swift App",
          },
          To: [
            {
              Email: email,
              Name: fullname.firstname,
            },
          ],
          Subject: "Verify your email",
          HTMLPart: `<h3>Welcome to Swift!</h3><p>Please verify your email by clicking <a href="${verifyUrl}">here</a>.</p>`,
        },
      ],
    });

    console.log("Mailjet response:", request.body);
  } catch (err) {
    console.error("Mailjet error:", err);
    throw new Error("Failed to send verification email.");
  }

  return { message: "Check your email to verify your account." };
};
