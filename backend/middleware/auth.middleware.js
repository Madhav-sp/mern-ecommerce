import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

export const protect = async (req, res, next) => {
  let token;

  // ✅ Get token from HTTP-only cookie
  token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user to req (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
