const userModel = require("../models/user.model");
const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blackListToken.model");

// Authentication: Attach user or admin to req.user
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlacklisted = await blackListTokenModel.findOne({ token });
  if (isBlacklisted) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await userModel.findById(decoded._id);
    if (!user) user = await adminModel.findById(decoded._id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });


    console.log("User authenticated:", req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Authorization: Only allow admins
module.exports.authAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};
