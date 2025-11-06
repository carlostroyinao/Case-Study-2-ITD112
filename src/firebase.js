import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHpeQUB369gszBJj4d9ZnteO1oExvIRas",
  authDomain: "filipinoemigrantsdb-7e2b1.firebaseapp.com",
  projectId: "filipinoemigrantsdb-7e2b1",
  storageBucket: "filipinoemigrantsdb-7e2b1.firebasestorage.app",
  messagingSenderId: "178937294713",
  appId: "1:178937294713:web:073fb8aa059018a52d09a8",
  measurementId: "G-4NPF3VRVNE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
