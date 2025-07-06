import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux"; // or context

const Orders = () => {
  const user = useSelector((state) => state.user.user); // or from auth context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const res = await axiosInstance.get(`/order/my-orders/${user._id}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching (success or error)
      }
    };
    if (user?._id) {
      // Only fetch if user ID is available
      fetchOrders();
    }
  }, [user?._id]); // Depend on user?._id to prevent unnecessary fetches

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <p className="ml-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">
        🧾 My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">
            You haven't placed any orders yet. Start shopping!
          </p>
          {/* You could add a link to browse products here */}
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl border border-gray-200
 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order ID:</p>
                  <p className="text-gray-800 font-mono text-xs break-all">
                    {order._id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">
                    Total Amount:
                  </p>
                  <p className="font-bold text-2xl text-purple-600">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Payment Status:</p>
                  <p
                    className={`mt-1 font-semibold ${
                      order.isPaid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {order.isPaid ? "✅ Paid" : "❌ Not Paid"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Order Date:</p>
                  <p className="mt-1 text-gray-600">
                    {order.paidAt
                      ? new Date(order.paidAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <p className="font-medium text-gray-700 mb-3">Items:</p>
                <ul className="divide-y divide-gray-100 border-t border-b border-gray-100">
                  {order.orderItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-3"
                    >
                      <span className="text-gray-800 font-medium flex-1">
                        {item.name}
                      </span>
                      <span className="text-gray-600 ml-4 flex-shrink-0">
                        ₹{item.price.toLocaleString("en-IN")} x {item.quantity}
                      </span>
                      <span className="text-gray-800 font-semibold ml-4 flex-shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
