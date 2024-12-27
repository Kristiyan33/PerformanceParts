'use client'; // Necessary for React hooks in Next.js App directory

import { useState, useEffect } from 'react';
import { fetchParts } from '../../lib/partsFunctions';
import { addToCart } from '../../lib/cartFunctions'; // Adjust the path to your cart functions
import { auth } from '../../lib/firebase'; // Adjust the path to your Firebase setup

export default function ShopPage() {
  const [parts, setParts] = useState([]); // Parts fetched from the database
  const [cart, setCart] = useState([]); // Local cart state
  const [user, setUser] = useState(null); // Authentication state
  const [selectedCategory, setSelectedCategory] = useState('all'); // Category filtering

  // Firebase Authentication Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch parts from Firestore
  useEffect(() => {
    const loadParts = async () => {
      try {
        const partsList = await fetchParts();
        setParts(partsList);
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    };

    loadParts();
  }, []);

  // Filter items based on the selected category
  const filteredParts = selectedCategory === 'all'
    ? parts
    : parts.filter((part) => part.category === selectedCategory);

  // Add to Cart Handler
  const handleAddToCart = async (part) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      await addToCart(user.uid, part); // Persist cart data to Firestore
      setCart((prevCart) => [...prevCart, part]); // Update local cart
      console.log(`${part.name} added to the cart.`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Could not add item to cart. Try again.');
    }
  };

  return (
    <div style={styles.shopContainer}>
      {/* Category Navigation */}
      <nav style={styles.navbar}>
        {['all', 'engine', 'suspension', 'aero'].map((category) => (
          <button
            key={category}
            style={selectedCategory === category ? styles.activeButton : styles.navButton}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </nav>

      <h1 style={styles.heading}>Shop Car Parts</h1>

      {/* Parts Display */}
      <div style={styles.partsList}>
        {filteredParts.length > 0 ? (
          filteredParts.map((part) => (
            <div key={part.id} style={styles.partItem}>
              {/* Product Info */}
              <div style={styles.productInfo}>
                <h2 style={styles.productName}>{part.name}</h2>
                <p style={styles.productDescription}>{part.description}</p>
                <p style={styles.productPrice}>Price: ${part.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(part)}
                  style={styles.addToCartButton}
                >
                  Add to Cart
                </button>
              </div>

              {/* Product Image */}
              <div style={styles.productImage}>
                <img src={part.image} alt={part.name} style={styles.imageStyle} />
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noPartsMessage}>No parts available in this category.</p>
        )}
      </div>

      {/* Shopping Cart */}
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
    padding: '2rem 15%',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1.5rem',
  },
  navButton: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    border: '1px solid #ccc',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  activeButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: '1px solid #28a745',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  partsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  partItem: {
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  productInfo: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: '1rem',
    color: '#555',
  },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  addToCartButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  productImage: {
    flex: '0 0 250px',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cartContainer: {
    marginTop: '2rem',
  },
  cartItem: {
    listStyle: 'none',
    padding: '0.5rem 0',
  },
  noPartsMessage: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#999',
  },
};
