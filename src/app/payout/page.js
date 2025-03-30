"use client"; // Mark this as a client component

import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  // Example cart items (Replace with your real cart state)
  const cartItems = [
    { name: "Product 1", price: 20, quantity: 1 },
    { name: "Product 2", price: 15, quantity: 2 },
  ];

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const data = await res.json();

    if (data.sessionUrl) {
      window.location.href = data.sessionUrl; // Redirect to Stripe Checkout
    } else {
      alert("Error starting checkout session");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">🛒 Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-300 text-center">Your cart is empty.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/20">
            <table className="w-full border-collapse bg-white/10 backdrop-blur-lg text-white">
              <thead>
                <tr className="border-b border-white/20 text-white text-left">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b border-white/20">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-right">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between mt-6 text-lg font-semibold text-white">
          <span>Total:</span>
          <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full mt-6 px-6 py-3 text-lg font-bold rounded-xl transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed text-gray-300"
              : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          }`}
        >
          {loading ? "Processing..." : "💳 Pay Now"}
        </button>
      </div>
    </div>
  );
}
