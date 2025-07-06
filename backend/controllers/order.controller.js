
import { Order } from "../models/order.model.js";

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const allorder = await Order.find().populate("user", "name email phone");
    res.status(200).json({ allorder });
  } catch (error) {
    console.error("Get All Orders Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getpendingorders=  async (req, res) => {
  try {
    const pendingOrders = await Order.find({ isDelivered: false }).populate("user", "name email phone");
    res.status(200).json({ pendingOrders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending orders" });
  }
};

// PUT /api/v1/order/mark-delivered/:orderId
export const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = new Date();

    await order.save();
    res.status(200).json({ success: true, message: "Order marked as delivered" });
  } catch (err) {
    console.error("Delivery update error:", err.message);
    res.status(500).json({ success: false, message: "Failed to mark as delivered" });
  }
};

