import express from "express";

const productRoutes = express.Router();

import { createProduct, deleteProduct,  getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

productRoutes.post("/", protect, admin,upload.single("image"), createProduct);
productRoutes.get("/", getAllProducts);     
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", protect, admin, updateProduct);   
productRoutes.delete("/delete", protect, admin, deleteProduct);


export default productRoutes;
