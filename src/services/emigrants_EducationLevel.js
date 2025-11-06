import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const educationLevelCollection = collection(db, "emigrants_education_level");

// ✅ CREATE
export const addEducationLevel = async (data) => {
  await addDoc(educationLevelCollection, data);
};

// ✅ READ
export const getEducationLevels = async () => {
  const snapshot = await getDocs(educationLevelCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ UPDATE
export const updateEducationLevel = async (id, data) => {
  const docRef = doc(db, "emigrants_education_level", id);
  await updateDoc(docRef, data);
};

// ✅ DELETE
export const deleteEducationLevel = async (id) => {
  const docRef = doc(db, "emigrants_education_level", id);
  await deleteDoc(docRef);
};
