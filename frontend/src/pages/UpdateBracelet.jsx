import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const UpdateBracelet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bracelet, setBracelet] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    countInStock: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingBracelet, setFetchingBracelet] = useState(true); // New state for initial fetch loading

  useEffect(() => {
    const fetchBracelet = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        setBracelet(res.data.product);
      } catch (error) {
        console.error("Error fetching bracelet:", error);
        toast.error("Failed to load bracelet details. Please try again.");
      } finally {
        setFetchingBracelet(false); // Set to false regardless of success or failure
      }
    };
    fetchBracelet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBracelet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put(`/product/${id}`, bracelet, {
        withCredentials: true,
      });
      toast.success("Bracelet updated successfully!");
      navigate("/bracelets");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        "Failed to update bracelet. Please check your inputs and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchingBracelet) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading bracelet details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          ✨ Update Bracelet
        </h2>

        {/* Image Preview */}
        {bracelet.image && (
          <div className="mb-8 flex justify-center">
            <img
              src={bracelet.image}
              alt="Bracelet Preview"
              className="h-60 w-auto max-w-full object-contain rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
        )}

        <form
          onSubmit={handleUpdate}
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
        >
          {/* Input Fields */}
          <div className="col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bracelet Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={bracelet.name}
              onChange={handleChange}
              placeholder="e.g., Elegant Silver Bracelet"
              className="input-field"
              required
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={bracelet.price}
              onChange={handleChange}
              placeholder="e.g., 49.99"
              className="input-field"
              required
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={bracelet.brand}
              onChange={handleChange}
              placeholder="e.g., LuxeJewels"
              className="input-field"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={bracelet.category}
              onChange={handleChange}
              placeholder="e.g., Sterling Silver"
              className="input-field"
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={bracelet.image}
              onChange={handleChange}
              placeholder="e.g., https://example.com/bracelet.jpg"
              className="input-field"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="countInStock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock Count
            </label>
            <input
              type="number"
              name="countInStock"
              id="countInStock"
              value={bracelet.countInStock}
              onChange={handleChange}
              placeholder="e.g., 50"
              className="input-field"
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={bracelet.description}
              onChange={handleChange}
              placeholder="A brief description of the bracelet..."
              rows="5"
              className="input-field resize-y"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-full pt-4">
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Bracelet"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBracelet;
