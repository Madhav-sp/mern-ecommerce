import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or path
      required: true,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 100,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin who added it
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
