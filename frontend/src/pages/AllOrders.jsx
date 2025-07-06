import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/order/getallorders");
        setOrders(res.data.allorder);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium py-6">{error}</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 flex justify-center items-center gap-2">
        <HiOutlineClipboardList className="text-purple-600" size={34} />
        All Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No orders found 😔
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between p-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="text-sm font-mono text-gray-800">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{order.totalPrice}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-4 text-sm text-gray-700">
                <div>
                  <p className="text-gray-500 font-medium">Payment</p>
                  <p className="flex items-center gap-1 mt-1 font-semibold">
                    {order.isPaid ? (
                      <>
                        <MdOutlineCheckCircle className="text-green-500" />
                        Paid
                      </>
                    ) : (
                      <>
                        <MdOutlineCancel className="text-red-500" />
                        Not Paid
                      </>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Delivery</p>
                  <p className="flex items-center gap-1 mt-1 font-semibold">
                    {order.isDelivered ? (
                      <>
                        <MdOutlineCheckCircle className="text-green-500" />
                        Delivered
                      </>
                    ) : (
                      <>
                        <MdOutlineCancel className="text-yellow-600" />
                        Pending
                      </>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Customer</p>
                  <p className="mt-1">
                    👤 {order.user?.name || "N/A"} <br />
                    📧 {order.user?.email || "N/A"} <br />
                    📱 {order.user?.phone || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Order Date</p>
                  <p className="mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-700 mb-2">🛍️ Items:</p>
                <ul className="divide-y divide-gray-100">
                  {order.orderItems?.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between py-2 text-sm text-gray-800"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span>
                        ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
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

export default AllOrders;
