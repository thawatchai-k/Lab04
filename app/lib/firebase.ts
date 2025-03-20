/*ธวัชชัย ครุธนวม 026740491802-6*/
// นำเข้า function สำหรับเริ่มต้น Firebase App
import { initializeApp } from "firebase/app";

// นำเข้า function สำหรับใช้งาน Firestore Database
import { getFirestore } from "firebase/firestore";

// นำเข้า function สำหรับใช้งาน Firebase Storage
import { getStorage } from "firebase/storage";

// ข้อมูลการตั้งค่า Firebase Project ของเรา
const firebaseConfig = {
  apiKey: "AIzaSyCZQEnaUPUl_rSfCo50LGD1qiGAhcXY-vw", // API Key สำหรับเชื่อมต่อ Firebase
  authDomain: "my-pet-form-3ddd4.firebaseapp.com",   // Domain สำหรับ Authentication
  projectId: "my-pet-form-3ddd4",                   // ID ของ Firebase Project
  storageBucket: "my-pet-form-3ddd4.firebasestorage.app", // ที่เก็บไฟล์ของ Firebase Storage
  messagingSenderId: "672973663755",                // Sender ID สำหรับ Cloud Messaging
  appId: "1:672973663755:web:49b5bc69f656dbfa3e610e" // ID สำหรับระบุ Firebase App
};

// เริ่มต้นการใช้งาน Firebase ด้วย config ที่กำหนด
const app = initializeApp(firebaseConfig);

// สร้าง instance สำหรับใช้งาน Firebase Storage
export const storage = getStorage(app);

// สร้าง instance สำหรับใช้งาน Firestore Database
export const db = getFirestore(app);
