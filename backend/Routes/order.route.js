import express from "express";
import { getAllOrders, getpendingorders, getUserOrders, markAsDelivered } from "../controllers/order.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";

const orderRoutes  = express.Router();

orderRoutes.get("/my-orders/:userId", getUserOrders);
orderRoutes.get("/getallorders",protect,admin, getAllOrders);
// Example Express route
orderRoutes.get("/getpendingorders", getpendingorders);
orderRoutes.put("/mark-delivered/:orderId", markAsDelivered);

export default orderRoutes;



