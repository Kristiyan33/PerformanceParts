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
                  <i className="fas fa-trash-alt"></i> Remove
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
    padding: '3rem 2rem',
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#121212',
    marginBottom: '0px',
    minHeight: '100vh',
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#f8f8f8',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '1.6rem',
    color: '#7F8C8D',
    fontWeight: '500',
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
    flex: '3 1 0',
    maxWidth: '800px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    backgroundColor: '#1F1F1F',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    cursor: 'pointer',
  },
  itemImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemDetails: {
    flex: 1,
    color: '#FFF',
  },
  itemName: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#E74C3C',
  },
  itemPrice: {
    fontSize: '1.1rem',
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
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #BDC3C7',
    backgroundColor: '#292929',
    color: '#fff',
  },
  removeButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#E74C3C',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    marginLeft: 'auto',
  },
  summaryContainer: {
    flex: '1 1 0',
    textAlign: 'center',
    backgroundColor: '#34495E',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto',
    minHeight: '300px',
  },
  totalPriceContainer: {
    marginBottom: '1.5rem',
  },
  totalPrice: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#FFF',
    marginBottom: '1.5rem',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  clearCartButton: {
    padding: '0.8rem 2rem',
    marginRight: '1rem',
    fontSize: '1.2rem',
    backgroundColor: '#E74C3C',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: '600',
    flex: '1',
  },
  checkoutButton: {
    padding: '0.8rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#28A745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: '600',
    flex: '1',
  },
};
