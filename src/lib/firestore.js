import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

// Firestore reference to the products collection
const productsCollectionRef = collection(db, "products");

// Create a product
export const createProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsCollectionRef, productData);
    console.log("Product added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Read all products
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(productsCollectionRef);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "products", id));
    console.log("Product deleted: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

// Update a product
export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedData);
    console.log("Product updated: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
