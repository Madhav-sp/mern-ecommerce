// AppRoutes.js
import React from "react";
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import Home from "./Home";
import Bracelets from "./Bracelets";
import About from "./About";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "../components/ProtectedRoute";
import Profile from "./Profile";
import Publish from "./Publish";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BraceletsDetails from "./BraceletsDetails";
import UpdateBracelet from "./UpdateBracelet";
import Orders from "./Orders";
import AllOrders from "./AllOrders";
import Pending from "./Pending";

const Layout = () => {
  const location = useLocation();
  const authPaths = ["/auth/signup", "/auth/login"];
  const isAuthPage = authPaths.includes(location.pathname);
  const isDashboard = location.pathname.startsWith("/dashboard");

  if (isAuthPage) {
    // ✅ Minimal layout for signup/login
    return (
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="mt-[4rem]">
          <Outlet />
        </div>
      </div>
      {!isDashboard && <Header />}
    </>
  );
};

const AppRoutes = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* ✅ Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/about" element={<About />} />
          <Route path="/bracelets/:id" element={<BraceletsDetails />} />
          <Route path="/dashboard/edit/:id" element={<UpdateBracelet />} />

          {/* Dashboard + Nested */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />

            {/* ✅ Admin routes */}
            {user?.isAdmin && <Route path="publish" element={<Publish />} />}
            {user?.isAdmin && (
              <Route path="allorders" element={<AllOrders />} />
            )}
            {user?.isAdmin && (
              <Route path="pending" element={<Pending />} />
            )}
          </Route>
        </Route>

        {/* 🔓 Public Routes */}
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />

        {/* 🚧 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
