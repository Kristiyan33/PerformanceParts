'use client';

import { useEffect, useRef } from "react";
import { useCart } from "../../lib/CartContext";  // Import your CartContext
import { useRouter } from "next/navigation";  // Updated import for Next 13+ 

export default function Success() {
  const { clearCart } = useCart();  // Clear cart function from the context
  const router = useRouter();
  const hasClearedCart = useRef(false); // Track if cart has already been cleared

  useEffect(() => {
    // Ensure the cart is cleared only once after the successful payment
    if (!hasClearedCart.current) {
      clearCart();
      hasClearedCart.current = true; // Mark cart as cleared
    }
  }, [clearCart]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "url('/placeholder-image.jpg') no-repeat center center/cover",  // Replace with your image
        color: "white",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          padding: "3rem",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Payment Successful! ✅
        </h1>
        <p style={{ fontSize: "1.5rem" }}>
          Thank you for your purchase. Your order is being processed.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <button
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#28A745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={() => router.push("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
