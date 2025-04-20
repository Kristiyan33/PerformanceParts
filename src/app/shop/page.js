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
      <h1 style={styles.title}>Пазарувай части за своя автомобил! </h1>

      {/* Filters */}
      <div style={styles.filterRow}>
        <select
          style={styles.filterDropdown}
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">Всички категории</option>
          <option value="suspension">Окачване и спирачки</option>
          <option value="engine">Двигател</option>
          <option value="aerodynamics">Аеродинамика</option>
        </select>
        <select
          style={styles.filterDropdown}
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="">Всички цени</option>
          <option value="0-499">$0 - $499</option>
          <option value="500-1999">$500 - $1999</option>
          <option value="2000-4999">$2000 - $4999</option>
          <option value="5000-9999">$5000 - $9999</option>
        </select>
        <button
          style={styles.clearFiltersButton}
          onClick={() => setFilters({ category: '', priceRange: '' })}
        >
          Изчисти филтрите
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
          <div style={styles.noProductsMessage}>Няма продукти отговарящи на търсенето.</div>
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
                  Добави към количката
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
    flexWrap: 'wrap', // Allow wrapping if the screen is small
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', // Flexible grid
    gap: '1.5rem',
    marginTop: '2rem',
  },

  // Ensure 5 items per row on large screens (desktop)
  '@media (min-width: 768px)': {
    productGrid: {
      gridTemplateColumns: 'repeat(5, 1fr)', // 5 items per row on larger screens
    },
  },

  // On smaller screens (mobile), 2 items per row
  '@media (max-width: 768px)': {
    productGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)', // 2 items per row on mobile devices
    },
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

  // Modal Styles (Updated for Responsiveness)
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
    maxWidth: '900px',  // Keep max width for large screens
    maxHeight: '450px', // Keep max height for large screens
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
    marginBottom: '1.5rem',
  },
  modalPrice: {
    fontSize: '1.3rem',
    color: '#80CBC4',
    fontWeight: 'bold',
  },
  modalAddToCart: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '2rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#e74c3c',
    cursor: 'pointer',
  },

  // Spinner (for loading)
  spinner: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-20px',
    marginLeft: '-20px',
    zIndex: '999',
  },
  doubleBounce1: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    animation: 'sk-bounce 2s infinite ease-in-out',
    position: 'absolute',
  },
  doubleBounce2: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#FFC107',
    animation: 'sk-bounce 2s infinite ease-in-out',
    position: 'absolute',
    animationDelay: '-1s',
  },

  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    pageContainer: {
      padding: '1rem', // Less padding on mobile
    },
    title: {
      fontSize: '2.5rem', // Smaller title for mobile
    },
    filterRow: {
      flexDirection: 'row', // Keep filters in a row even on mobile
      justifyContent: 'center',
      flexWrap: 'wrap', // Allow wrapping of filters on small screens
    },
    productCard: {
      padding: '1rem', // Smaller padding for cards on mobile
    },
    productName: {
      fontSize: '1.2rem', // Smaller product name for mobile
    },
    productPrice: {
      fontSize: '1rem', // Smaller price text for mobile
    },
    modalContent: {
      width: '80vw', // More responsive modal size for mobile
      height: 'auto', // Height adjusts for mobile
    },
    modalImage: {
      width: '100%', // Image should scale to 100% on small screens
    },
    modalBody: {
      flexDirection: 'column', // Stack content vertically in modal on mobile
    },
    spinner: {
      width: '30px',
      height: '30px', // Smaller spinner size for mobile
    },
  },
};



