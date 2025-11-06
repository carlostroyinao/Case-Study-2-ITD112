import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const originCollection = collection(db, "emigrants_origin");

// ✅ CREATE
export const addOriginGroup = async (data) => {
  await addDoc(originCollection, data);
};

// ✅ READ
export const getOriginGroups = async () => {
  const snapshot = await getDocs(originCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ UPDATE
export const updateOriginGroup = async (id, data) => {
  const docRef = doc(db, "emigrants_origin", id);
  await updateDoc(docRef, data);
};

// ✅ DELETE
export const deleteOriginGroup = async (id) => {
  const docRef = doc(db, "emigrants_origin", id);
  await deleteDoc(docRef);
};
