import { razorpay } from "../utils/razorpay.js";
import crypto from "crypto";
import { Order } from "../models/order.model.js"; // for saving order

// 🔹 1. Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("Received payment request for amount:", amount);
    console.log("🧪 RAZORPAY_KEY_ID =", process.env.RAZORPAY_KEY_ID);
    console.log("🧪 RAZORPAY_KEY_SECRET =", process.env.RAZORPAY_KEY_SECRET);


    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    console.log("Creating Razorpay order with:", options);
    const order = await razorpay.orders.create(options);
    console.log("Created order:", order);


    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};

// 🔹 2. Verify Payment and Save Order
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body;

    const signBody = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signBody.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res
        .status(400)
        .json({ success: false, message: "Signature mismatch!" });
    }

    // ✅ Save the verified order to DB
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod: "Razorpay",
      totalPrice,
      isPaid: true,
      paidAt: new Date(),
    });

    await order.save();

    res.status(200).json({ success: true, message: "Payment Verified", order });
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
