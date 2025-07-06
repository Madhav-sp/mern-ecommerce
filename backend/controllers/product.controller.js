import express from "express";
import { Product } from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name,price,description,category,brand } = req.body;
        const image = req.file?.path; // Assuming you're using multer for file uploads
        if (!name || !price || !description || !category || !brand || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = new Product({
            name,
            price,
            description,
            category,
            brand,
            image,
            createdBy: req.user._id, // Assuming req.user is set by the protect middleware
        });
        await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllProducts = async (req, res) => {
  try {
    const products= await Product.find() 
      .sort({ createdAt: -1 }); 
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
    
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById( id );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product fetched successfully", product });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProduct = async (req, res) => { 
  try {
    const {id}=req.params;
    const updates= req.body;

    const updateProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if( !updateProduct){
      res.status(404).json({message: " product not found..."});
    }
    res.status( 200).json({ message:"updated successfully", updateProduct});



  } catch (error) {
    rconsole.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });

  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

