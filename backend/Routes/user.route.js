import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const userRoutes = express.Router();

userRoutes.post("/login",loginUser);
userRoutes.post("/signup", registerUser);
userRoutes.get("/profile",protect ,getUserProfile);
userRoutes.post("/profile",protect ,updateUserProfile); 
userRoutes.delete("/logout",logoutUser);

export default userRoutes;