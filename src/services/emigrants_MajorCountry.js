import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const majorCountryCollection = collection(db, "emigrants_major_country");

// ✅ CREATE
export const addMajorCountryGroup = async (data) => {
  await addDoc(majorCountryCollection, data);
};

// ✅ READ
export const getMajorCountryGroups = async () => {
  const snapshot = await getDocs(majorCountryCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ UPDATE
export const updateMajorCountryGroup = async (id, data) => {
  const docRef = doc(db, "emigrants_major_country", id);
  await updateDoc(docRef, data);
};

// ✅ DELETE
export const deleteMajorCountryGroup = async (id) => {
  const docRef = doc(db, "emigrants_major_country", id);
  await deleteDoc(docRef);
};
