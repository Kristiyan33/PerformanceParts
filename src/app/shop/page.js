'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useCart } from '../../lib/CartContext';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
  });
  const [hovered, setHovered] = useState(null);
  const { cart, addToCart } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login'); // Redirect to login if not logged in
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return; // Only fetch products if user is authenticated

    const fetchProducts = async () => {
      setLoading(true);
      const collectionRef = collection(db, 'products');
      const snapshot = await getDocs(collectionRef);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, [user]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  useEffect(() => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const closeModal = () => setHovered(null);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Shop High-Performance Parts</h1>

      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <div style={styles.filtersContainer}>
            <select style={styles.filterDropdown} value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
              <option value="">All categories</option>
              <option value="suspension">Suspension</option>
              <option value="engine">Engine</option>
              <option value="aerodynamics">Aerodynamics</option>
            </select>
            <select style={styles.filterDropdown} value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
              <option value="">All price ranges</option>
              <option value="0-499">$0 - $499</option>
              <option value="500-1999">$500 - $1999</option>
              <option value="2000-4999">$2000 - $4999</option>
              <option value="4999-9999">$4999 - $9999</option>
            </select>
            <button style={styles.clearFiltersButton} onClick={() => setFilters({ category: '', priceRange: '' })}>Clear Filters</button>
          </div>
        </div>

        <div style={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} onMouseEnter={() => setHovered(product.id)} onMouseLeave={() => setHovered(null)} style={{ ...styles.productCard, ...(hovered === product.id ? styles.productCardHover : {}) }}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
                <h2 style={styles.productName}>{product.name}</h2>
                <p style={styles.productDescription}>{product.description}</p>
                <p style={styles.productPrice}>
                  ${product.price ? Number(product.price).toFixed(2) : 'N/A'}
                </p>
                <button style={styles.addToCartButton} onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <div style={styles.noProductsMessage}>No products match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}

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
    backgroundColor: '#121212',
    fontFamily: 'Poppins, sans-serif',
    color: '#e0e0e0',
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '2rem',
    fontWeight: 'bold',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row', // Keep the filters on the left and products on the right
    gap: '0', // Removed gap between sections
    justifyContent: 'flex-start', // Align left to remove additional spacing
  },
  sidebar: {
    width: '300px', // Fixed width for the filter sidebar
    backgroundColor: '#1f1f1f',
    padding: '1.5rem',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    marginBottom: '0', // Removed margin at the bottom
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  filterDropdown: {
    padding: '0.8rem 1rem',
    fontSize: '1.1rem',
    border: '1px solid #3c3c3c',
    borderRadius: '12px',
    backgroundColor: '#292929',
    color: '#e0e0e0',
    transition: 'border-color 0.3s, background-color 0.3s',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  clearFiltersButton: {
    padding: '0.8rem 1.2rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: '#e74c3c',
    border: '2px solid #e74c3c',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
    width: '100%',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem', // Reduced gap between products
    justifyContent: 'center',
    flex: 1, // Allow grid to take the rest of the space
  },

  '@media (max-width: 1200px)': {
    mainContent: {
      flexDirection: 'column',
    },
    sidebar: {
      width: '100%',
      marginBottom: '2rem',
    },
    productGrid: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  '@media (max-width: 900px)': {
    productGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  '@media (max-width: 600px)': {
    productGrid: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  productCard: {
    backgroundColor: '#1e1e1e',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  productCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.8)',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '1rem',
    transition: 'transform 0.3s',
  },
  noProductsMessage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '50vh',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#121212',
    borderRadius: '10px',
    margin: '2rem auto',
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
    backgroundColor: '#3498db',
    opacity: 0.6,
    position: 'absolute',
    animation: 'sk-bounce 2s infinite ease-in-out',
  },
  doubleBounce2: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#2980b9',
    opacity: 0.6,
    position: 'absolute',
    animation: 'sk-bounce 2s infinite ease-in-out',
    animationDelay: '-1s',
  },
};

