import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const occupationCollection = collection(db, "emigrants_occupation");

// ✅ CREATE
export const addOccupationGroup = async (data) => {
  await addDoc(occupationCollection, data);
};

// ✅ READ
export const getOccupationGroups = async () => {
  const snapshot = await getDocs(occupationCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ UPDATE
export const updateOccupationGroup = async (id, data) => {
  const docRef = doc(db, "emigrants_occupation", id);
  await updateDoc(docRef, data);
};

// ✅ DELETE
export const deleteOccupationGroup = async (id) => {
  const docRef = doc(db, "emigrants_occupation", id);
  await deleteDoc(docRef);
};
