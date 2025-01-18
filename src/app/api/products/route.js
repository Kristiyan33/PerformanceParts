// app/api/products/route.js
import { db } from "../../../lib/firebase.js";  // Path to your firebase config
import { collection, getDocs } from "firebase/firestore";

// Fetch products from Firestore
export async function GET() {
  try {
    // Get all products from Firestore
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return the products as JSON
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
