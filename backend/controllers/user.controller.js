import express from 'express';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    
}
// /api/v1/users/logout
export const logoutUser = (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd, // ❗ Only secure in production (localhost blocks this)
    sameSite: isProd ? "None" : "Lax", // ✅ Match login cookie
  });

  return res.status(200).json({ message: "Logged out successfully" });
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isProd = process.env.NODE_ENV === "production";

    // ✅ Set token in HTTP-only cookie with correct SameSite
    res
      .cookie("token", generateToken(user._id), {
        httpOnly: true,
        secure: isProd, // ✅ secure in prod only
        sameSite: isProd ? "None" : "Lax", // ✅ Lax in dev, None in prod
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .status(200)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          address: user.address,
        },
        message: "Login successful",
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

  

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body; // ✅ include phone here

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // ✅ Now include phone in User.create()
    const user = await User.create({ name, email, password, address, phone });

    res
      .cookie("token", generateToken(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone, // ✅ return phone too
          isAdmin: user.isAdmin,
          address: user.address,
        },
        message: "User registered successfully",
      });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

  

export const getUserProfile = async (req, res) => { 
    try {
        const userId=req.user._id;
        const user= await User.findById(userId);
        if(!user){
           return  res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
        });
        
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUserProfile = async (req, res) => {
    const userId=req.user._id;
    const { name, email, password, address } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password; // Password will be hashed in the pre-save hook
        }
        user.address = address || user.address;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            address: updatedUser.address,
            token: generateToken(updatedUser._id), // Regenerate token after update
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

