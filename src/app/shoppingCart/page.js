'use client';

import { useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'High-Performance Exhaust System',
      price: 499.99,
      quantity: 1,
      image: 'images/exhaust.jpg', // Example image
    },
    {
      id: 2,
      name: 'Adjustable Coilovers',
      price: 899.99,
      quantity: 1,
      image: 'images/coilovers.jpg', // Example image
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Your Cart</h1>
      <div style={styles.contentRow}>
        {/* Cart Items Section */}
        <div style={styles.cartSection}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartItemImage} />
              <div style={styles.cartItemDetails}>
                <h2 style={styles.cartItemName}>{item.name}</h2>
                <p style={styles.cartItemPrice}>${item.price.toFixed(2)}</p>
                <div style={styles.quantityControl}>
                  <label htmlFor={`quantity-${item.id}`} style={styles.quantityLabel}>
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                    style={styles.quantityInput}
                  />
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div style={styles.summarySection}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <p style={styles.summaryText}>
            <strong>Total Items:</strong> {cartItems.length}
          </p>
          <p style={styles.summaryText}>
            <strong>Total Cost:</strong> ${total.toFixed(2)}
          </p>
          <button style={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    color: '#333',
  },
  title: {
    fontSize: '2.5rem',
    color: '#0056b3',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  contentRow: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  cartSection: {
    flex: 2,
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '1rem',
  },
  cartItemImage: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#444',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  quantityLabel: {
    fontSize: '1rem',
    color: '#555',
  },
  quantityInput: {
    width: '60px',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  removeButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  summarySection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  summaryTitle: {
    fontSize: '1.8rem',
    color: '#444',
    marginBottom: '1rem',
  },
  summaryText: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  checkoutButton: {
    padding: '1rem 1.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
