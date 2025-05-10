import userModel from "../models/user.model.js";
import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import blackListTokenModel from "../models/blackListToken.model.js";


// Authentication: Attach user or admin to req.user
export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlacklisted = await blackListTokenModel.findOne({ token });
 
  if (isBlacklisted) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user = await userModel.findById(decoded._id);
    
    if (!user) user = await adminModel.findById(decoded._id);
    
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Authorization: Only allow admins
export const authAdmin = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};
