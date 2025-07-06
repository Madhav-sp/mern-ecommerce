import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: false,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"],
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
  },
  { timestamps: true }
);

// 🔐 Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔒 Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
