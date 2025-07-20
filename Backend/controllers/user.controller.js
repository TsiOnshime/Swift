import crypto from "crypto";
import userModel from "../models/user.model.js";
import mailjet from "node-mailjet";
import * as userService from "../services/user.service.js";
import blackListTokenModel from "../models/blacklistToken.model.js"
import { rewardUser } from "../services/reward.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, password, walletAddress } = req.body;
    const result = await userService.registerUser({
      fullname,
      email,
      password,
      walletAddress,
    });

    res.status(201).json(result);
  } catch (err) {
    if (err.message === "Email already in use" || err.message === "All fields are required") {
      err.status = 400;
    }
    next(err);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.query;
    const user = await userModel.findOne({ email, verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.json({ message: "Email verified" });
  } catch (err) {
    return res.status(400).json({ message: "Verification failed" });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { fullname, email, profileImage } = req.body;
    const userId = req.user._id;

    const firstname = fullname?.firstname;
    const lastname = fullname?.lastname;

    const updatedUser = await userService.updateUser(
      userId,
      firstname,
      lastname,
      email,
      profileImage
    );
    if (!updatedUser) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const rewardUserForPackage = async (req, res) => {
  try {
    const { walletAddress, amount } = req.body;
    if (!walletAddress || !amount) {
      return res.status(400).json({ message: "walletAddress and amount required" });
    }
    await rewardUser(walletAddress, amount);
    res.status(200).json({ message: "Reward sent!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;

    // Send email (Mailjet example)
    await mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: { Email: process.env.MJ_SENDER_EMAIL, Name: "Swift App" },
            To: [{ Email: email, Name: user.fullname.firstname }],
            Subject: "Password Reset",
            HTMLPart: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
          },
        ],
      });

    res.json({ message: "Reset link sent! Check your inbox." });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await userModel.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await userModel.hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    next(err);
  }
};