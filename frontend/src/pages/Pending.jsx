import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const Pending = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/order/getpendingorders");
      setOrders(res.data.pendingOrders);
    } catch (err) {
      console.error("Error fetching pending orders:", err);
      setError("Failed to fetch pending orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const handleMarkDelivered = async (orderId) => {
    try {
      const res = await axiosInstance.put(`/order/mark-delivered/${orderId}`);
      if (res.data.success) {
        toast.success("Order marked as delivered!");
        fetchPendingOrders();
      }
    } catch (err) {
      console.error("Failed to mark as delivered:", err);
      toast.error("Could not update delivery status");
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading pending orders...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        🚚 Pending Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">
          All orders have been delivered! 🎉
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg border border-gray-200
 shadow-lg transition hover:shadow-xl"
            >
              {/* Order Top Info */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-gray-500">Order ID:</p>
                  <p className="text-sm font-mono">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total:</p>
                  <p className="text-xl font-bold text-purple-700">
                    ₹{order.totalPrice}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">User Info:</p>
                  <p className="text-gray-800 text-sm leading-snug">
                    {order.user?.name} <br />
                    {order.user?.email} <br />
                    {order.user?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Order Date:</p>
                  <p>{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-gray-500">Paid:</p>
                  <p
                    className={order.isPaid ? "text-green-600" : "text-red-500"}
                  >
                    {order.isPaid ? "✅ Yes" : "❌ No"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Delivery Status:</p>
                  <p className="text-yellow-600 font-semibold">⏳ Pending</p>
                </div>
              </div>

              {/* Items List */}
              <div>
                <p className="font-semibold text-gray-700 mb-2">🛍️ Items:</p>
                <ul className="border-t border-gray-100 divide-y divide-gray-100">
                  {order.orderItems.map((item, idx) => (
                    <li key={idx} className="py-2 flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-gray-600">
                        ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ✅ Mark as Delivered Button */}
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleMarkDelivered(order._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pending;
