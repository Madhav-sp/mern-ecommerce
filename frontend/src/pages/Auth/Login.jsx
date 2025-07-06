import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { loginUser, setUser } from "../../redux/user/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const from = location.state?.from || "/"; // 👈 Capture original page

  const handleformSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInputData = Object.fromEntries(formData.entries());

    try {
      const res = await dispatch(loginUser(formInputData)).unwrap();
      dispatch(setUser(res));
      toast.success("Login successful");
      setLoginSuccess(true);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate(from, { replace: true }); // 👈 Redirect back after login
    }
  }, [loginSuccess, navigate, from]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Login to your Bead Bracelets account
        </p>

        <form className="space-y-4" onSubmit={handleformSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <NavLink
            to="/auth/signup"
            className="text-orange-500 hover:underline"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
