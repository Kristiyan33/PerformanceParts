import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'products'), product);
      alert('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Име на продукта"
        value={product.name}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={product.description}
        onChange={handleChange}
        required
        style={styles.textarea}
      />
      <input
        type="number"
        name="price"
        placeholder="Цена"
        value={product.price}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="category"
        placeholder="Категория"
        value={product.category}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="text"
        name="image"
        placeholder="URL адрес на снимката"
        value={product.image}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.submitButton}>Добави продукт</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#2c2c2c',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
    maxWidth: '800px',
    margin: '0 auto', // центриране
  },
  input: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    border: '1px solid #444',
    borderRadius: '6px',
    backgroundColor: '#1F2937',
    color: '#fff',
    outline: 'none',
  },
  textarea: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    border: '1px solid #444',
    borderRadius: '6px',
    backgroundColor: '#1F2937',
    color: '#fff',
    height: '6rem',
    resize: 'vertical',
    outline: 'none',
  },
  submitButton: {
    padding: '0.9rem',
    backgroundColor: '#3C5173',
    color: '#fff',
    fontWeight: '600',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};



export default AddProduct;
