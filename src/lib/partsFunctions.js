import { db } from './firebase'; // Import Firestore setup
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Firestore collection reference
const partsCollectionRef = collection(db, 'parts');

// Add a new part
export const addPart = async (part) => {
  try {
    const docRef = await addDoc(partsCollectionRef, part);
    console.log('Part added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding part:', error);
    throw error;
  }
};

// Fetch all parts
export const fetchParts = async () => {
  try {
    const querySnapshot = await getDocs(partsCollectionRef);
    const parts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return parts;
  } catch (error) {
    console.error('Error fetching parts:', error);
    throw error;
  }
};

// Update a part
export const updatePart = async (id, updatedPart) => {
  try {
    const partDoc = doc(db, 'parts', id);
    await updateDoc(partDoc, updatedPart);
    console.log('Part updated successfully.');
  } catch (error) {
    console.error('Error updating part:', error);
    throw error;
  }
};

// Delete a part
export const deletePart = async (id) => {
  try {
    const partDoc = doc(db, 'parts', id);
    await deleteDoc(partDoc);
    console.log('Part deleted successfully.');
  } catch (error) {
    console.error('Error deleting part:', error);
    throw error;
  }
};
