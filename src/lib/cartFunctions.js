import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../lib/firebase.js"; // Adjust if your Firebase file path is different

// Add item to cart
export async function addToCart(userId, item) {
    const cartRef = doc(db, "carts", userId); // Document reference for the user's cart
    try {
      // Merge with the existing cart (using arrayUnion to avoid duplicates)
      await updateDoc(cartRef, {
        items: arrayUnion(item),
      });
      console.log("Item added to cart:", item);
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  }
  

// Fetch cart items
export async function getCartItems(userId) {
    const cartRef = doc(db, "carts", userId);
    try {
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        return cartDoc.data().items || [];
      } else {
        console.log("Cart is empty");
        return [];
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      return [];
    }
  }

// Remove item from cart
export async function removeFromCart(userId, itemId) {
  const cartRef = doc(db, "carts", userId);
  try {
    const cartDoc = await getDoc(cartRef);
    if (cartDoc.exists()) {
      const currentItems = cartDoc.data().items || [];
      const updatedItems = currentItems.filter((item) => item.id !== itemId);
      await updateDoc(cartRef, { items: updatedItems });
      console.log("Item removed:", itemId);
    }
  } catch (err) {
    console.error("Error removing item:", err);
  }
}

// Update item quantity
export async function updateItemQuantity(userId, itemId, quantity) {
  const cartRef = doc(db, "carts", userId);
  try {
    const cartDoc = await getDoc(cartRef);
    if (cartDoc.exists()) {
      const currentItems = cartDoc.data().items || [];
      const updatedItems = currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      await updateDoc(cartRef, { items: updatedItems });
      console.log("Quantity updated:", itemId, quantity);
    }
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
}
