"use client"; // This tells Next.js this is a client-side component

import { useState } from "react";
import { createProduct } from "../lib/firestore"; // Import createProduct function

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    type: "",
    image: "",
    info: "",
    available: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productId = await createProduct(newProduct);
    console.log(`Product added with ID: ${productId}`);
    // Reset form
    setNewProduct({
      name: "",
      price: 0,
      type: "",
      image: "",
      info: "",
      available: true,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={newProduct.price}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Category (e.g., suspension, engine)"
          value={newProduct.type}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <textarea
          name="info"
          placeholder="Product Description"
          value={newProduct.info}
          onChange={handleInputChange}
          style={styles.textarea}
          required
        />
        <div style={styles.checkboxContainer}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="available"
              checked={newProduct.available}
              onChange={() =>
                setNewProduct((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              style={styles.checkbox}
            />
            Available
          </label>
        </div>
        <button type="submit" style={styles.submitButton}>
          Add Product
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  textarea: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    height: "120px",
    resize: "vertical",
    transition: "border 0.3s ease",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  checkboxLabel: {
    fontSize: "1rem",
    color: "#555",
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    width: "16px",
    height: "16px",
  },
  submitButton: {
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default AddProduct;
