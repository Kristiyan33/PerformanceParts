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
  const [filters, setFilters] = useState({ category: '', priceRange: '' });
  const [hovered, setHovered] = useState(null);
  const { cart, addToCart } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;
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
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    let filtered = products;
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }
    setFilteredProducts(filtered);
  }, [filters, products]);

  if (loading) return <Spinner />;

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Shop High-Performance Parts</h1>

      {/* Filters */}
      <div style={styles.filterRow}>
        <select
          style={styles.filterDropdown}
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All categories</option>
          <option value="suspension">Suspension</option>
          <option value="engine">Engine</option>
          <option value="aerodynamics">Aerodynamics</option>
        </select>
        <select
          style={styles.filterDropdown}
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="">All price ranges</option>
          <option value="0-499">$0 - $499</option>
          <option value="500-1999">$500 - $1999</option>
          <option value="2000-4999">$2000 - $4999</option>
          <option value="5000-9999">$5000 - $9999</option>
        </select>
        <button
          style={styles.clearFiltersButton}
          onClick={() => setFilters({ category: '', priceRange: '' })}
        >
          Clear
        </button>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelectedProduct(product)}
              style={{
                ...styles.productCard,
                ...(hovered === product.id ? styles.productCardHover : {}),
              }}
            >
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <h2 style={styles.productName}>{product.name}</h2>
              <p style={styles.productDescription}>{product.description}</p>
              <p style={styles.productPrice}>
                ${product.price ? Number(product.price).toFixed(2) : 'N/A'}
              </p>
            </div>
          ))
        ) : (
          <div style={styles.noProductsMessage}>No products match your filters.</div>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={() => setSelectedProduct(null)}>×</button>
            <div style={styles.modalBody}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={styles.modalImage} />
              <div style={styles.modalText}>
                <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
                <p style={styles.modalDescription}>{selectedProduct.description}</p>
                <p style={styles.modalPrice}>${Number(selectedProduct.price).toFixed(2)}</p>
                <button
                  style={styles.modalAddToCart}
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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

const styles = {
  pageContainer: {
    padding: '2rem',
    backgroundColor: '#121212',
    fontFamily: 'Poppins, sans-serif',
    color: '#e0e0e0',
    minHeight: '100vh',
  },
  title: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: 'bold',
  },
  filterRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    justifyContent: 'center',
  },
  filterDropdown: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    borderRadius: '10px',
    backgroundColor: '#292929',
    color: '#e0e0e0',
    border: '1px solid #444',
    outline: 'none',
    minWidth: '180px',
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
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  productCard: {
    backgroundColor: '#1e1e1e',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  productCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.8)',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '1rem',
  },
  productName: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  productDescription: {
    fontSize: '0.95rem',
    color: '#bbb',
    marginBottom: '1rem',
  },
  productPrice: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#80CBC4',
  },
  noProductsMessage: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '3rem',
    color: '#ccc',
  },

  // Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: '1rem',
  },
  modalContent: {
    backgroundColor: '#1f1f1f',
    borderRadius: '15px',
    padding: '1.5rem',
    width: '60vw',
    height: '30vw', // 2:1 aspect ratio
    maxWidth: '900px',
    maxHeight: '450px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalBody: {
    display: 'flex',
    gap: '2rem',
    height: '100%',
  },
  modalImage: {
    width: '50%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  modalText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#eee',
  },
  modalTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: '1rem',
    color: '#ccc',
    marginTop: '1rem',
    flexGrow: 1,
  },
  modalPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#80cbc4',
    marginTop: '1rem',
  },
  modalAddToCart: {
    padding: '0.8rem 1.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    backgroundColor: '#3C5173',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '2rem',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },

  // Spinner
  spinner: {
    width: '40px',
    height: '40px',
    position: 'relative',
    margin: '100px auto',
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
