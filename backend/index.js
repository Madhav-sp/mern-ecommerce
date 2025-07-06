import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./Routes/user.route.js";
import cookieParser from "cookie-parser";
import productRoutes from "./Routes/product.route.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import orderRoutes from "./Routes/order.route.js";
const app = express();
dotenv.config();    
// Middleware


app.use(
  cors({
    origin: "http://localhost:5173", // ✅ exact origin only
    credentials: true, // ✅ allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

//db connection
connectDB();

//Middleware for routes
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/product",productRoutes)

app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes); 


app.get("/", (req, res) => {
    res.send("Welcome to the backend server");  
    });


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

