import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Publish = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    countInStock: "", // ✅ added
    description: "",
    category: "",
    brand: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.post("/api/v1/product/", formData, {
        withCredentials: true,
      });
      toast.success("Product Published!");
      navigate("/bracelets"); 
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📦 Publish New Product
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter price"
            />
          </div>

          {/* Count In Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count in Stock
            </label>
            <input
              name="countInStock"
              type="number"
              value={form.countInStock}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Bracelets, Rings"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              name="brand"
              type="text"
              value={form.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Brand name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition"
          >
            {loading ? "Uploading..." : "🚀 Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
