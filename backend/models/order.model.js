import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        qty: Number,
        price: Number,
        image: String,
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
   
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    
    deliveredAt: Date,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
