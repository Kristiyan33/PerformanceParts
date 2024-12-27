'use client';

import React, { useState, useEffect } from 'react';
import { addPart, fetchParts, deletePart } from '../../lib/partsFunctions';

export default function AdminPartsPage() {
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  // Fetch parts on component mount
  useEffect(() => {
    const loadParts = async () => {
      const partsList = await fetchParts();
      setParts(partsList);
    };
    loadParts();
  }, []);

  // Handle adding a part
  const handleAddPart = async () => {
    try {
      if (!newPart.name || !newPart.price || !newPart.category || !newPart.image) {
        alert('Please fill out all fields.');
        return;
      }
      const price = parseFloat(newPart.price);
      if (isNaN(price)) {
        alert('Price must be a number.');
        return;
      }
      await addPart({ ...newPart, price });
      setParts((prevParts) => [...prevParts, { ...newPart, price }]);
      setNewPart({ name: '', description: '', price: '', category: '', image: '' });
    } catch (error) {
      console.error('Error adding part:', error);
      alert('Could not add part. Try again.');
    }
  };

  // Handle deleting a part
  const handleDeletePart = async (id) => {
    try {
      await deletePart(id);
      setParts((prevParts) => prevParts.filter((part) => part.id !== id));
    } catch (error) {
      console.error('Error deleting part:', error);
      alert('Could not delete part. Try again.');
    }
  };

  return (
    <div style={styles.adminContainer}>
      <h1>Admin: Manage Parts</h1>

      {/* Add Part Form */}
      <div style={styles.formContainer}>
        <h2>Add New Part</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPart.name}
          onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={newPart.description}
          onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
          style={styles.textarea}
        />
        <input
          type="text"
          placeholder="Price"
          value={newPart.price}
          onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={newPart.category}
          onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPart.image}
          onChange={(e) => setNewPart({ ...newPart, image: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddPart} style={styles.button}>
          Add Part
        </button>
      </div>

      {/* Parts List */}
      <div style={styles.partsList}>
        <h2>Existing Parts</h2>
        {parts.map((part) => (
          <div key={part.id} style={styles.partItem}>
            <h3>{part.name}</h3>
            <p>{part.description}</p>
            <p>Price: ${part.price}</p>
            <p>Category: {part.category}</p>
            <img src={part.image} alt={part.name} style={styles.image} />
            <button onClick={() => handleDeletePart(part.id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  adminContainer: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  formContainer: {
    marginBottom: '2rem',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  textarea: {
    display: 'block',
    width: '100%',
    height: '100px',
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  partsList: {
    marginTop: '2rem',
  },
  partItem: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'cover',
  },
};
