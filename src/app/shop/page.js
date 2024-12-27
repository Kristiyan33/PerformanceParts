'use client'; // Necessary for React hooks in Next.js App directory

import { useState, useEffect } from 'react';
import { addToCart } from '../../lib/cartFunctions';
import { auth } from '../../lib/firebase'; // Import Firebase auth

export default function ShopPage() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Check for the authenticated user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Static data for car parts
  const parts = [
    { 
      id: 1, 
      name: 'Engine Performance Kit', 
      description: 'Boost your engine power with this high-performance kit.', 
      price: 499.99,
      image: '/images/home-img-01.jpg' // Replace with actual image URLs
    },
    { 
      id: 2, 
      name: 'Suspension Upgrade', 
      description: 'Enhance your car’s handling with upgraded suspension components.', 
      price: 299.99,
      image: '/images/suspension kit.jpg' // Replace with actual image URLs
    },
    { 
      id: 3, 
      name: 'Carbon Fiber Hood', 
      description: 'Lightweight carbon fiber hood to reduce weight and improve aerodynamics.', 
      price: 799.99,
      image: '/images/hoood.jpg' // Replace with actual image URLs
    },
    { 
      id: 4, 
      name: 'Turbocharger Kit', 
      description: 'Upgrade your engine with this turbocharger kit for more power and torque.', 
      price: 999.99,
      image: '/images/turbooo.jpg' // Replace with actual image URLs
    },
    { 
      id: 5, 
      name: 'Brake Kit', 
      description: 'High-performance brake kit for better stopping power and safety.', 
      price: 399.99,
      image: '/images/brake kit.jpg' // Replace with actual image URLs
    },
  ];

  // Function to handle adding parts to the cart
  const handleAddToCart = async (part) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      await addToCart(user.uid, part); // Persist the item in Firestore
      setCart((prevCart) => [...prevCart, part]); // Update local state
      console.log(`Item added to cart: ${part.name}`);
    } catch (err) {
      console.error('Error adding item to cart:', err);
      alert('Failed to add item to cart.');
    }
  };

  return (
    <div style={styles.shopContainer}>
      <h1 style={styles.heading}>Shop Car Parts</h1>
      <div style={styles.partsList}>
        {parts.map((part) => (
          <div key={part.id} style={styles.partItem}>
            <div style={styles.productDetails}>
              {/* Left side: Name, Price, and Add to Cart */}
              <div style={styles.productInfo}>
                <h2>{part.name}</h2>
                <p>{part.description}</p>
                <p><strong>Price: ${part.price.toFixed(2)}</strong></p>
                <button 
                  onClick={() => handleAddToCart(part)} 
                  style={styles.addToCartButton}
                >
                  Add to Cart
                </button>
              </div>

              {/* Right side: Image */}
              <div style={styles.productImage}>
                <img src={part.image} alt={part.name} style={styles.imageStyle} />
              </div>
            </div>

            {/* Lower part: Additional Info */}
            <div style={styles.productInfoField}>
              <input 
                type="text" 
                placeholder="Enter additional info" 
                style={styles.inputField}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={styles.cartContainer}>
        <h2>Shopping Cart ({cart.length} items)</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} style={styles.cartItem}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  shopContainer: {
    padding: '2rem',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  partsList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  partItem: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  productDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productInfo: {
    flex: '1',
    paddingRight: '1rem',
  },
  productImage: {
    flex: '1',
    textAlign: 'center',
  },
  imageStyle: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  cartContainer: {
    marginTop: '3rem',
    padding: '1.5rem',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
  },
  cartItem: {
    fontSize: '1rem',
    padding: '5px 0',
    borderBottom: '1px solid #ddd',
  },
  productInfoField: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  inputField: {
    width: '80%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '1rem',
  },
};
