
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsto-q3ZHde0sFpq91yzImgzI8DacDqGw",
  authDomain: "house-marketplace-98ca7.firebaseapp.com",
  projectId: "house-marketplace-98ca7",
  storageBucket: "house-marketplace-98ca7.appspot.com",
  messagingSenderId: "747818636968",
  appId: "1:747818636968:web:f2f1b4bb4ff35fb193949d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
