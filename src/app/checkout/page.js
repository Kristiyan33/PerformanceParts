"use client";

import { useState } from "react";
import { useCart } from "../../lib/CartContext"; // Import CartContext

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const { cart, calculateTotal } = useCart(); // Get cart items & total price

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cart }), // Send real cart items
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${calculateTotal()}</h3>
      <button onClick={handleCheckout} disabled={loading || cart.length === 0}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  )
}
