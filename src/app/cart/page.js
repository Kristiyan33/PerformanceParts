'use client';

import { useCart } from '../../lib/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  // Calculate the total price of the cart
  const calculateTotal = () => 
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart }),
      });
  
      const data = await response.json();
  
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl; // Redirect user to Stripe Checkout
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
      <h1 style={styles.title}>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.emptyMessage}>Your cart is empty!</p>
      ) : (
        <div style={styles.cartContent}>
          {/* Left side: Cart Items */}
          <div style={styles.cartItemsContainer}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemDetails}>
                  <h2 style={styles.itemName}>{item.name}</h2>
                  <p style={styles.itemPrice}>
                    Price: ${item.price ? parseFloat(item.price).toFixed(2) : 'N/A'}
                  </p>
                  <div style={styles.quantityContainer}>
                    <label htmlFor={`quantity-${item.id}`} style={styles.label}>
                      Quantity:
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
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right side: Summary and Checkout */}
          <div style={styles.summaryContainer}>
            <div style={styles.totalPriceContainer}>
              <p style={styles.totalPrice}>
                Total: ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <div style={styles.buttonsContainer}>
              <button style={styles.clearCartButton} onClick={clearCart}>
                Clear Cart
              </button>
              <button style={styles.checkoutButton} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = {
  pageContainer: {
    padding: '2rem',
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#121212',
    marginBottom: '0px',
  },
  title: {
    fontSize: '2.8rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2C3E50',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '1.4rem',
    color: '#34495E',
  },
  cartContent: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  cartItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 3, // Taking up more space on the left side
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#1f1f1f',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    transition: 'box-shadow 0.3s ease',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemDetails: {
    flex: 1,
    color: '#fff',
  },
  itemName: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#2C3E50',
  },
  itemPrice: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    color: '#7F8C8D',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityInput: {
    width: '60px',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #BDC3C7',
  },
  removeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#E74C3C',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  summaryContainer: {
    flex: 1, // Taking up less space on the right
    textAlign: 'center',
    backgroundColor: '#34495E',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Ensures content is spaced out
    height: '100%', // To allow the buttons to be at the bottom
  },
  totalPriceContainer: {
    marginBottom: '1rem',
  },
  totalPrice: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsContainer: {
    marginTop: 'auto', // This pushes the buttons to the bottom of the container
  },
  clearCartButton: {
    padding: '0.8rem 1.5rem',
    marginRight: '1rem',
    fontSize: '1rem',
    backgroundColor: '#E74C3C',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  checkoutButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
