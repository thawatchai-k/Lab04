import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZQEnaUPUl_rSfCo50LGD1qiGAhcXY-vw",
  authDomain: "my-pet-form-3ddd4.firebaseapp.com",
  projectId: "my-pet-form-3ddd4",
  storageBucket: "my-pet-form-3ddd4.firebasestorage.app",
  messagingSenderId: "672973663755",
  appId: "1:672973663755:web:49b5bc69f656dbfa3e610e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
