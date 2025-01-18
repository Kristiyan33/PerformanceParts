"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../lib/firestore"; // Import getProducts function

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.info}</p>
              <p>Price: ${product.price}</p>
              <p>Type: {product.type}</p>
              <p>Available: {product.available ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
