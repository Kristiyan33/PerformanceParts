'use client';

import { useCart } from '../../lib/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!address.trim()) {
      alert("Моля, въведете адрес за доставка.");
      return;
    }

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart, address, notes }),
      });

      const data = await response.json();

      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        alert("Error: Unable to proceed to checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong while proceeding to checkout");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Твоята пазарска количка</h1>

      {cart.length === 0 ? (
        <p style={styles.emptyMessage}>Количката ви е празна!</p>
      ) : (
        <div style={styles.cartContent}>
          {/* Cart Items */}
          <div style={styles.cartItemsContainer}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemDetails}>
                  <h2 style={styles.itemName}>{item.name}</h2>
                  <p style={styles.itemPrice}>
                    Цена: ${item.price ? parseFloat(item.price).toFixed(2) : 'N/A'}
                  </p>
                  <div style={styles.quantityContainer}>
                    <label htmlFor={`quantity-${item.id}`} style={styles.label}>
                      Количество:
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      style={styles.quantityInput}
                    />
                  </div>
                </div>
                <button
                  className="hover-red"
                  style={{ ...styles.actionButton }}
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fas fa-trash-alt"></i> Премахни
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={styles.summaryContainer}>
            <p style={styles.totalPrice}>Общо: ${calculateTotal().toFixed(2)}</p>

            <div style={styles.deliveryInfo}>
              <p style={styles.deliveryText}>Очаквана доставка: 2-4 работни дни</p>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="address" style={styles.label}>
                Адрес за доставка:
              </label>
              <input
                id="address"
                type="text"
                placeholder="ул. Примерна 123, гр. София"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={styles.inputField}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="notes" style={styles.label}>
                Бележки към поръчката:
              </label>
              <textarea
                id="notes"
                placeholder="Допълнителна информация (по желание)"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={styles.textArea}
              />
            </div>

            <div style={styles.buttonsContainer}>
              <button
                className="hover-red"
                style={{ ...styles.actionButton, flex: 1, marginRight: '1rem' }}
                onClick={clearCart}
              >
                Изпразни количката
              </button>
              <button
                className="hover-green"
                style={{ ...styles.actionButton, flex: 1 }}
                onClick={handleCheckout}
              >
                Продължи към разплащането
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hover-red:hover {
          background-color: #e74c3c !important;
        }
        .hover-green:hover {
          background-color: #2ecc71 !important;
        }
      `}</style>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '3rem 2rem',
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#121212',
    minHeight: '100vh',
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#ffffff',
    fontWeight: '700',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#999',
  },
  cartContent: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  cartItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: '3',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    backgroundColor: '#1F1F1F',
    padding: '1.2rem',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemDetails: {
    flex: 1,
    color: '#ffffff',
  },
  itemName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.3rem',
    color: '#3498db',
  },
  itemPrice: {
    fontSize: '1rem',
    color: '#bbb',
  },
  quantityContainer: {
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityInput: {
    width: '60px',
    padding: '0.5rem',
    backgroundColor: '#2c2c2c',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '5px',
  },
  summaryContainer: {
    flex: '1',
    backgroundColor: '#1A1A1A',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '300px',
  },
  totalPrice: {
    fontSize: '1.8rem',
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: '2rem',
  },
  deliveryInfo: {
    marginBottom: '1rem',
  },
  deliveryText: {
    color: '#8BC34A',
    fontWeight: '500',
    fontSize: '1rem',
  },
  formGroup: {
    marginBottom: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#bbb',
    fontSize: '0.95rem',
    marginBottom: '0.4rem',
  },
  inputField: {
    padding: '0.7rem',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#2c2c2c',
    color: '#fff',
    fontSize: '1rem',
  },
  textArea: {
    padding: '0.7rem',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#2c2c2c',
    color: '#fff',
    fontSize: '1rem',
    resize: 'none',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  actionButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1.1rem',
    backgroundColor: '#2980b9',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};
