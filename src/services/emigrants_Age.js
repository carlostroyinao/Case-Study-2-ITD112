import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const ageCollection = collection(db, "emigrants_age");

// ✅ CREATE
export const addAgeGroup = async (data) => {
  await addDoc(ageCollection, data);
};

// ✅ READ
export const getAgeGroups = async () => {
  const snapshot = await getDocs(ageCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ UPDATE
export const updateAgeGroup = async (id, data) => {
  const docRef = doc(db, "emigrants_age", id);
  await updateDoc(docRef, data);
};

// ✅ DELETE
export const deleteAgeGroup = async (id) => {
  const docRef = doc(db, "emigrants_age", id);
  await deleteDoc(docRef);
};
