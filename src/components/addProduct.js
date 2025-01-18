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
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={newProduct.type}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
        />
        <textarea
          name="info"
          placeholder="Info"
          value={newProduct.info}
          onChange={handleInputChange}
        />
        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={newProduct.available}
            onChange={() => setNewProduct({ ...newProduct, available: !newProduct.available })}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
