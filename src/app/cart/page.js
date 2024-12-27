'use client'; // To use React hooks

import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase'; // Import Firebase auth object
import { getCartItems } from '../../lib/cartFunctions'; // Your custom function to get cart items from the database

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]); // To store cart items
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch cart items for the logged-in user
  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser; // Get the current logged-in user
      if (user) {
        try {
          // Fetch cart items using user ID
          const cart = await getCartItems(user.uid);
          setCartItems(cart); // Set cart items to state
        } catch (err) {
          setError("Failed to load cart items.");
        }
      } else {
        setError("Please log in to view your cart.");
      }
      setLoading(false); // Stop loading
    };

    fetchCartItems(); // Call the function to fetch cart items
  }, []); // Run once when the component mounts

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cartItems.length) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
