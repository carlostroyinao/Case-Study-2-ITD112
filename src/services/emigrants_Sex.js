import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const sexCollection = collection(db, "emigrants_sex");

// ✅ CREATE
export const addSexGroup = async (data) => {
  await addDoc(sexCollection, data);
};

// ✅ READ
export const getSexGroups = async () => {
  const snapshot = await getDocs(sexCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ UPDATE
export const updateSexGroup = async (id, data) => {
  const docRef = doc(db, "emigrants_sex", id);
  await updateDoc(docRef, data);
};

// ✅ DELETE
export const deleteSexGroup = async (id) => {
  const docRef = doc(db, "emigrants_sex", id);
  await deleteDoc(docRef);
};
