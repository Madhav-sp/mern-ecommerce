import React from "react";
import toast from "react-hot-toast";

const TestRazorpay = () => {
  const handlePayment = async () => {
    const res = await fetch("http://localhost:3000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }), // ₹1.00
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_1p3YGT9LLA5rlT", 
      amount: data.order.amount,
      currency: "INR",
      name: "Test Store",
      description: "Test Payment",
      order_id: data.order.id,
      handler: async function (response) {
        const verifyRes = await fetch(
          "http://localhost:5000/api/payment/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: "dummyuserid123",
              orderItems: [],
              shippingAddress: {},
              totalPrice: 100,
            }),
          }
        );

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          toast.success("Payment successful & verified");
         
        } else {
          toast.error(" Payment failed or tampered");
         
        }
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Razorpay Payment</h2>
      <button onClick={handlePayment}>Pay ₹1</button>
    </div>
  );
};

export default TestRazorpay;
