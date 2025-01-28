"use client";

import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../lib/firestore"; // Import delete and update functions

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const [editedProduct, setEditedProduct] = useState({});

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Handle edit mode toggling
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditedProduct(product);
  };

  // Handle input changes during editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited product
  const handleSave = async () => {
    await updateProduct(editedProduct);
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct ? editedProduct : product
      )
    );
    setEditingProduct(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product List</h2>
      {products.length === 0 ? (
        <p style={styles.message}>No products available.</p>
      ) : (
        <ul style={styles.list}>
          {products.map((product) => (
            <li key={product.id} style={styles.listItem}>
              {editingProduct === product.id ? (
                <div style={styles.editContainer}>
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleEditChange}
                    style={styles.input}
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleEditChange}
                    style={styles.input}
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    name="type"
                    value={editedProduct.type}
                    onChange={handleEditChange}
                    style={styles.input}
                    placeholder="Type"
                  />
                  <textarea
                    name="info"
                    value={editedProduct.info}
                    onChange={handleEditChange}
                    style={styles.textarea}
                    placeholder="Info"
                  />
                  <label>
                    Available:
                    <input
                      type="checkbox"
                      name="available"
                      checked={editedProduct.available}
                      onChange={() =>
                        setEditedProduct((prev) => ({
                          ...prev,
                          available: !prev.available,
                        }))
                      }
                      style={styles.checkbox}
                    />
                  </label>
                  <button onClick={handleSave} style={styles.saveButton}>
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.info}>{product.info}</p>
                  <p style={styles.detail}>Price: ${product.price}</p>
                  <p style={styles.detail}>Type: {product.type}</p>
                  <p style={styles.detail}>
                    Available: {product.available ? "Yes" : "No"}
                  </p>
                  <button
                    onClick={() => handleEdit(product)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Montserrat', sans-serif",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  message: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#555",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    backgroundColor: "#fff",
    marginBottom: "1rem",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  productName: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#007bff",
  },
  info: {
    fontSize: "1rem",
    color: "#555",
    margin: "0.5rem 0",
  },
  detail: {
    fontSize: "1rem",
    color: "#666",
  },
  editButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  textarea: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    resize: "vertical",
  },
  checkbox: {
    marginLeft: "0.5rem",
  },
  saveButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};

export default ProductList;

