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
    padding: '1rem',
    backgroundColor: '#3C5173',
    borderRadius: '8px',
    maxWidth: '1000px',
    margin: '2rem auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: '1.3rem',
    color: '#f0f0f0',
  },
  productList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  productItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1.5rem',
    backgroundColor: '#1F1F1F',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    gap: '1rem',
    color: '#fff',
  },
  productImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#F39C12',
    marginBottom: '0.3rem',
  },
  productDescription: {
    fontSize: '1rem',
    color: '#BDC3C7',
    marginBottom: '0.5rem',
  },
  productPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#00BCD4',
    marginBottom: '0.3rem',
  },
  productCategory: {
    fontSize: '1rem',
    color: '#95A5A6',
    marginBottom: '0.5rem',
  },
  deleteButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#34495E',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
};

export default ProductList;
