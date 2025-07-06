import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { logoutUser } from "../redux/user/userSlice";

import {
  MdLogout,
  MdShoppingBag,
  MdPendingActions,
  MdOutlineIncompleteCircle,
  MdChevronRight,
  MdChevronLeft,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiSolidDashboard } from "react-icons/bi";

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.delete("/users/logout", {
        withCredentials: true,
      });
      dispatch(logoutUser());
      navigate("/auth/login");
      console.log(res.data.message);
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-2 bg-gray-200 rounded-lg text-indigo-600 font-semibold shadow-sm transition-all"
      : "flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all";

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Mobile Arrow Toggle - Center Left */}
      <div className="md:hidden fixed top-1/2 left-0 -translate-y-1/2 z-50">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-white p-2 rounded-r-md shadow-md text-gray-600"
          >
            <MdChevronRight className="text-2xl" />
          </button>
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 shadow-md p-6 space-y-6 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile Close Arrow */}
        <div className="md:hidden mb-4 flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 text-2xl"
          >
            <MdChevronLeft />
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
          <p className="text-sm text-gray-500">
            Welcome, {user?.name?.split(" ")[0]}
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard/orders" className={navClass}>
            <MdShoppingBag className="text-xl" />
            <span>My Orders</span>
          </NavLink>

          <NavLink to="/dashboard/profile" className={navClass}>
            <CgProfile className="text-xl" />
            <span>Profile</span>
          </NavLink>

          {user?.isAdmin && (
            <>
              <div className="mt-4 mb-1 text-xs uppercase text-gray-400 tracking-wide">
                Admin Panel
              </div>
              <NavLink to="/dashboard/allorders" className={navClass}>
                <MdOutlineIncompleteCircle className="text-xl" />
                <span>Total Orders</span>
              </NavLink>
              <NavLink to="/dashboard/pending" className={navClass}>
                <MdPendingActions className="text-xl" />
                <span>Pending Orders</span>
              </NavLink>
              <NavLink to="/dashboard/publish" className={navClass}>
                <BiSolidDashboard className="text-xl" />
                <span>Publish</span>
              </NavLink>
            </>
          )}

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <MdLogout className="text-xl" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-50 ml-0 md:ml-0">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 min-h-[80vh]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
