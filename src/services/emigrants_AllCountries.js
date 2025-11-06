import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const allCountriesCollection = collection(db, "emigrants_all_countries");

// ✅ CREATE
export const addAllCountriesGroup = async (data) => {
  await addDoc(allCountriesCollection, data);
};

// ✅ READ
export const getAllCountriesGroups = async () => {
  const snapshot = await getDocs(allCountriesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ UPDATE
export const updateAllCountriesGroup = async (id, data) => {
  const docRef = doc(db, "emigrants_all_countries", id);
  await updateDoc(docRef, data);
};

// ✅ DELETE
export const deleteAllCountriesGroup = async (id) => {
  const docRef = doc(db, "emigrants_all_countries", id);
  await deleteDoc(docRef);
};
