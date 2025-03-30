import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const collectionRef = collection(db, 'products');
      const snapshot = await getDocs(collectionRef);
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter((product) => product.id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div style={styles.container}>
      {products.length === 0 ? (
        <p style={styles.noProductsText}>No products available</p>
      ) : (
        <ul style={styles.productList}>
          {products.map((product) => (
            <li key={product.id} style={styles.productItem}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <div style={styles.productDetails}>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productDescription}>{product.description}</p>
                <p style={styles.productPrice}>${product.price}</p>
                <p style={styles.productCategory}>{product.category}</p>
                <button onClick={() => handleDelete(product.id)} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    maxWidth: '900px',
    margin: '2rem auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  productList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  productItem: {
    display: 'flex',
    marginBottom: '1.5rem',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  productImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '1rem',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '0.5rem',
  },
  productDescription: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '0.5rem',
    lineHeight: '1.6',
  },
  productPrice: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '0.5rem',
  },
  productCategory: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '1rem',
  },
  deleteButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ProductList;
