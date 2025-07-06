import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";

const OrderSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 shadow-md p-6 animate-pulse space-y-4"
        >
          {/* Header Skeleton */}
          <div className="flex justify-between items-center border-b pb-4">
            <div className="space-y-1">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="w-36 h-3 bg-gray-100 rounded" />
            </div>
            <div className="text-right space-y-1">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="w-20 h-6 bg-gray-300 rounded" />
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="w-32 h-4 bg-gray-200 rounded" />
              <div className="w-24 h-3 bg-gray-100 rounded" />
            </div>
            <div className="space-y-1">
              <div className="w-28 h-4 bg-gray-200 rounded" />
              <div className="w-32 h-3 bg-gray-100 rounded" />
            </div>
          </div>

          {/* Items Skeleton */}
          <div>
            <div className="w-20 h-4 bg-gray-300 mb-3 rounded" />
            {[...Array(2)].map((_, j) => (
              <div
                key={j}
                className="flex justify-between items-center py-2 border-t border-gray-100"
              >
                <div className="w-32 h-4 bg-gray-200 rounded" />
                <div className="w-24 h-4 bg-gray-100 rounded" />
                <div className="w-20 h-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Orders = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/order/my-orders/${user._id}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchOrders();
    }
  }, [user?._id]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">
        🧾 My Orders
      </h2>

      {loading ? (
        <OrderSkeleton />
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">
            You haven't placed any orders yet. Start shopping!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
