'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Ensure this path is correct

export default function ShopPage() {
  const [products, setProducts] = useState([]); // Products from Firestore
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
  });
  const [hovered, setHovered] = useState(null); // Hover state for cards
  const [hoveredImage, setHoveredImage] = useState(null); // Hover state for images
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modal

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const collectionRef = collection(db, 'products');
      const snapshot = await getDocs(collectionRef);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const closeModal = () => setSelectedProduct(null);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Shop High-Performance Parts</h1>

      {/* Filters */}
      <div style={styles.filtersContainer}>
        <select
          style={styles.filterDropdown}
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">Category</option>
          <option value="brakes">Brakes</option>
          <option value="suspension">Suspension</option>
          <option value="exhaust">Exhaust</option>
        </select>
        <select
          style={styles.filterDropdown}
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="">Price Range</option>
          <option value="0-500">$0 - $500</option>
          <option value="500-1500">$500 - $1500</option>
          <option value="1500-5000">$1500 - $5000</option>
        </select>
        <button style={styles.clearFiltersButton} onClick={() => setFilters({})}>
          Clear Filters
        </button>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelectedProduct(product)} // Open modal on click
            style={{
              ...styles.productCard,
              ...(hovered === product.id ? styles.productCardHover : {}),
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              onMouseEnter={() => setHoveredImage(product.id)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{
                ...styles.productImage,
                ...(hoveredImage === product.id ? styles.productImageHover : {}),
              }}
            />
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.productDescription}>{product.description}</p>
            <p style={styles.productPrice}>
              ${product.price ? Number(product.price).toFixed(2) : 'N/A'}
            </p>
            <button
              style={styles.addToCartButton}
              onMouseEnter={(e) => (e.target.style.background = 'linear-gradient(45deg, #0056b3, #003f7f)')}
              onMouseLeave={(e) => (e.target.style.background = 'linear-gradient(45deg, #007bff, #0056b3)')}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalCloseButton} onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={styles.modalImage}
            />
            <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
            <p style={styles.modalDescription}>{selectedProduct.description}</p>
            <p style={styles.modalPrice}>
              ${selectedProduct.price ? Number(selectedProduct.price).toFixed(2) : 'N/A'}
            </p>
            <button style={styles.modalAddToCartButton}>Add to Cart</button>
            <button style={styles.modalBuyNowButton}>Buy Now</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Spinner Component
function Spinner() {
  return (
    <div style={styles.spinner}>
      <div style={styles.doubleBounce1}></div>
      <div style={styles.doubleBounce2}></div>
    </div>
  );
}

// Styles
const styles = {
  pageContainer: {
    padding: '2rem',
    backgroundColor: '#f4f4f9',
    fontFamily: 'Montserrat, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  },
  filterDropdown: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  clearFiltersButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  productCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
    transition: 'transform 0.3s',
  },
  productImageHover: {
    transform: 'scale(1.1)',
  },
  productName: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  productDescription: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
  },
  productPrice: {
    fontSize: '1.2rem',
    color: '#444',
    marginBottom: '1rem',
  },
  addToCartButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    background: 'linear-gradient(45deg, #007bff, #0056b3)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.3s',
  },
  spinner: {
    width: '40px',
    height: '40px',
    position: 'relative',
    margin: '0 auto',
  },
  doubleBounce1: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    opacity: 0.6,
    position: 'absolute',
    animation: 'sk-bounce 2s infinite ease-in-out',
  },
  doubleBounce2: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#0056b3',
    opacity: 0.6,
    position: 'absolute',
    animation: 'sk-bounce 2s infinite ease-in-out',
    animationDelay: '-1s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '500px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
  },
  modalImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  modalTitle: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
  },
  modalDescription: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1rem',
  },
  modalPrice: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
  },
  modalAddToCartButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '1rem',
  },
  modalBuyNowButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

