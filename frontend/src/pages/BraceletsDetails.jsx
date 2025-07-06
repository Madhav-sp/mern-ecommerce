import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BraceletsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [bracelet, setBracelet] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user.user);

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/auth/login", { state: { from: location.pathname } });
      return;
    }

    toast.success("Redirecting to payment...");

    try {
      const { data } = await axiosInstance.post("/payment/create-order", {
        amount: bracelet.price * quantity,
      });

      const options = {
        key: "rzp_test_1p3YGT9LLA5rlT", // Replace with your Razorpay test key
        amount: data.order.amount,
        currency: "INR",
        name: "Bracelets Store",
        description: `Order for ${bracelet.name}`,
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const { data: verifyData } = await axiosInstance.post(
              "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user?._id || "guest",
                orderItems: [
                  {
                    name: bracelet.name,
                    price: bracelet.price,
                    quantity: quantity,
                    product: bracelet._id,
                  },
                ],
                shippingAddress: {
                  address: "Demo Street 101",
                  city: "Hyderabad",
                  postalCode: "500001",
                  country: "India",
                },
                totalPrice: bracelet.price * quantity,
              }
            );

            if (verifyData.success) {
              toast.success("Payment successful!");
            } else {
              toast.error("Payment verification failed or tampered!");
            }
          } catch (err) {
            toast.error("Error verifying payment.");
            console.error("Verify Error:", err);
          }
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment initiation failed.");
      console.error("Payment Error:", err);
    }
  };

  useEffect(() => {
    const fetchBracelet = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        const fetchedBracelet = res.data.product;
        setBracelet(fetchedBracelet);
        setSelectedImage(
          fetchedBracelet.images && fetchedBracelet.images.length > 0
            ? fetchedBracelet.images[0]
            : fetchedBracelet.image
        );
      } catch (error) {
        console.error("Failed to fetch bracelet:", error);
      }
    };

    fetchBracelet();
  }, [id]);

  if (!bracelet) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  const productImages = bracelet.images || [bracelet.image];
  const discountPercentage =
    bracelet.originalPrice && bracelet.originalPrice > bracelet.price
      ? Math.round(
          ((bracelet.originalPrice - bracelet.price) / bracelet.originalPrice) *
            100
        )
      : null;

  return (
    <div className="min-h-screen bg-white px-4 py-20 flex justify-center">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16">
        {/* Left - Image */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-[480px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
            <img
              src={selectedImage}
              alt={bracelet.name}
              className="object-contain max-h-full max-w-full"
            />
            {discountPercentage && (
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium rounded-full">
                {discountPercentage}% OFF
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {productImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                }`}
                alt="Thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            {bracelet.name}
          </h1>

          <div className="flex items-center space-x-4">
            {bracelet.originalPrice > bracelet.price && (
              <span className="text-gray-500 line-through text-lg">
                ₹{bracelet.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-black">
              ₹{bracelet.price}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed text-base">
            {bracelet.description}
          </p>

          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Category:</span>{" "}
              {bracelet.category}
            </p>
            <p>
              <span className="font-medium text-gray-800">Availability:</span>{" "}
              {bracelet.countInStock > 0 ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({bracelet.countInStock})
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </p>
            <p className="text-xs text-gray-400">
              Added on:{" "}
              {new Date(bracelet.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Quantity & Buttons */}
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              max={bracelet.countInStock}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.min(
                    Math.max(1, parseInt(e.target.value || 1)),
                    bracelet.countInStock
                  )
                )
              }
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:border-black"
              disabled={bracelet.countInStock === 0}
            />
            <button
              disabled={bracelet.countInStock === 0}
              className="flex-1 bg-black text-white py-3 rounded-md font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              Add to Bag
            </button>
            <button
              onClick={handleBuyNow}
              disabled={bracelet.countInStock === 0}
              className="flex-1 border border-black text-black py-3 rounded-md font-medium hover:bg-gray-100 transition disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          {bracelet.countInStock === 0 && (
            <p className="text-sm text-red-500 font-medium">
              This item is currently out of stock.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BraceletsDetails;
