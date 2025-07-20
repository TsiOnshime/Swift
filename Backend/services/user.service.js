import userModel from "../models/user.model.js";
import crypto from "crypto";
import mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();

const mailjetClient = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

export const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  walletAddress,
}) => {
  if (!firstname || !email || !password || !walletAddress) {
    throw new Error("All fields are required");
  }
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    walletAddress, // save wallet address
  });
  return user;
};

export const registerUser = async (data) => {
  console.log(data);
  const { fullname, email, password, walletAddress } = data;
  if (
    !fullname ||
    !fullname.firstname ||
    !email ||
    !password ||
    !walletAddress
  ) {
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
    walletAddress: walletAddress,
    verificationToken: token,
    verified: false,
  });

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}&email=${email}`;
  const logoUrl = "https://i.postimg.cc/j24shcyW/vite.png"; // Adjust if your logo is hosted elsewhere

  const verificationHtml = `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:500px;margin:auto;background:#fff;padding:32px 24px;border-radius:12px;border:1.5px solid rgb(64,133,88);">
      <div style="text-align:center;margin-bottom:24px;">
        <img src="${logoUrl}" alt="Swift Logo" style="height:60px;margin-bottom:8px;" />
      </div>
      <h2 style="color:rgb(64,133,88);text-align:center;margin-bottom:16px;">Welcome to Swift E-Scooter!</h2>
      <p style="font-size:1.1rem;color:#222;text-align:center;">
        Hi <b>${fullname.firstname}</b>,<br>
        Thank you for registering. Please verify your email address to activate your account.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${verifyUrl}" style="background:rgb(64,133,88);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:1.1rem;display:inline-block;">
          Verify Email
        </a>
      </div>
      <p style="color:#888;text-align:center;font-size:0.95rem;">
        If you did not sign up, you can safely ignore this email.
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px 0;">
      <p style="color:#bbb;text-align:center;font-size:0.9rem;">
        &copy; ${new Date().getFullYear()} Swift E-Scooter
      </p>
    </div>
  `;

  try {
    const request = await mailjetClient
      .post("send", { version: "v3.1" })
      .request({
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
            HTMLPart: verificationHtml,
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

export const updateUser = async (
  id,
  firstname,
  lastname,
  email,
  profileImage
) => {
  if (!id) throw new Error("User ID is required");

  const user = await userModel.findById(id);
  if (!user) throw new Error("User not found");

  if (firstname) user.fullname.firstname = firstname;
  if (lastname) user.fullname.lastname = lastname;
  if (email) user.email = email;
  if (profileImage) user.profileImage = profileImage;

  await user.save();
  return user;
};
