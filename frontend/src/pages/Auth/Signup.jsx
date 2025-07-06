import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "pincode", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
   
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error(" Passwords do not match");
      navigate("/login");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const res = await axiosInstance.post("/users/signup", dataToSend);
      toast.success(" Registration successful!");
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account 🎉
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Join Bead Bracelets and start your journey
        </p>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Personal Details */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />

          {/* Address */}
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.address.street}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md col-span-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.address.state}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.address.pincode}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.address.country}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            className="col-span-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up 
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink
            to="/auth/login"
            className="font-medium text-orange-500 hover:underline"
          >
            Login here
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
