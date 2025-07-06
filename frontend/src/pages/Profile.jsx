import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/user/userSlice";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserShield,
  FaEdit,
  FaPrint,
  FaCheckCircle,
} from "react-icons/fa";

const Label = ({ icon, label }) => (
  <div className="flex items-center text-gray-500 font-medium">
    <span className="mr-2">{icon}</span>
    {label}
  </div>
);

function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 font-medium text-xl animate-pulse">
          Loading profile...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 bg-white px-6 py-4 rounded shadow border">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700">
              {user?.name?.[0] || <FaUser />}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-gray-800">
              {user?.name || "N/A"}
            </h2>
            <p className="text-sm text-gray-500">
              UID: {user?._id?.slice(0, 8)}...
            </p>
            <span className="mt-3 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center">
              <FaCheckCircle className="mr-1" />
              Verified
            </span>
          </div>

          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div className="flex justify-between border-b py-2">
              <Label icon={<FaEnvelope />} label="Email" />
              <span className="font-medium text-right">{user?.email}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <Label icon={<FaUser />} label="Status" />
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <Label icon={<FaUserShield />} label="Admin" />
              <span className="font-medium">
                {user?.isAdmin ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <Label icon={<FaCalendarAlt />} label="Created" />
              <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <Label icon={<FaCalendarAlt />} label="Updated" />
              <span>{new Date(user?.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center pb-6 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" /> Address Info
              </h3>
              <p className="text-sm text-gray-400">Saved address on file</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium flex items-center">
              <FaEdit className="mr-2" /> Edit
            </button>
          </div>

          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div className="flex justify-between border-b py-2">
              <span>Street</span>
              <span className="font-medium text-right">
                {user?.address?.street || "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>City</span>
              <span className="font-medium">
                {user?.address?.city || "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>State</span>
              <span className="font-medium">
                {user?.address?.state || "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Pincode</span>
              <span className="font-medium">
                {user?.address?.pincode || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>Country</span>
              <span className="font-medium">
                {user?.address?.country || "N/A"}
              </span>
            </div>

            <div className="pt-6 border-t">
              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center py-2.5 bg-gray-800 hover:bg-black text-white font-semibold rounded-md shadow-sm"
              >
                <FaPrint className="mr-2" /> Print Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
