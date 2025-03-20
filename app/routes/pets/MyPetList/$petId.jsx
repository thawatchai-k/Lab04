/*ธวัชชัย ครุธนวม 026740491802-6*/
// Import hook และ component จาก Remix
import { useLoaderData, Link } from "@remix-run/react";

// Import Firestore instance ที่ config ไว้แล้ว
import { db } from "~/config/firebase";

// Import function สำหรับดึงเอกสารจาก Firestore
import { doc, getDoc } from "firebase/firestore";

// Import json สำหรับตอบข้อมูลกลับใน loader
import { json } from "@remix-run/node";

// ====== Loader Function ======
// ฟังก์ชันนี้จะทำงานฝั่ง server สำหรับดึงข้อมูลสัตว์เลี้ยงที่เลือกมาแสดง
export async function loader({ params }) {
  const petId = params.petId; // ดึง petId จาก URL parameter
  
  try {
    // อ้างอิงเอกสารใน collection "pets" ที่มี id ตรงกับ petId
    const petDoc = doc(db, "pets", petId);
    const petSnapshot = await getDoc(petDoc); // ดึงข้อมูลจาก Firestore
    
    // ถ้าไม่พบเอกสาร
    if (!petSnapshot.exists()) {
      throw new Error("Pet not found");
    }
    
    // คืนค่า pet object พร้อมข้อมูล และ birthdate
    return json({ 
      pet: {
        id: petSnapshot.id,
        ...petSnapshot.data(),
        birthdate: petSnapshot.data().birthdate || "" // ถ้าไม่มี birthdate ให้ default เป็น ""
      }
    });
  } catch (error) {
    // ถ้า error (เช่น id ไม่ถูกต้อง) คืนค่า error message พร้อม status 404
    return json({ error: "Failed to load pet details" }, { status: 404 });
  }
}

// ====== React Component ======
export default function PetDetail() {
  // ดึงข้อมูลที่ loader ส่งมา โดยใช้ useLoaderData
  const { pet, error } = useLoaderData();

  // ถ้าเกิด error เช่น ไม่พบข้อมูล pet
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error} {/* แสดงข้อความ error */}
        </div>
        <Link 
          to="/pets/MyPetList" 
          className="text-blue-500 hover:underline"
        >
          Back to Pet List {/* ลิงก์กลับไปหน้า MyPetList */}
        </Link>
      </div>
    );
  }

  // ถ้าโหลดข้อมูลสำเร็จ จะแสดงรายละเอียดของ pet
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pet Details</h1>
      
      <div className="mb-4">
        <Link 
          to="/pets/MyPetList" 
          className="text-blue-500 hover:underline"
        >
          Back to Pet List {/* ปุ่มกลับ */}
        </Link>
      </div>
      
      {/* Layout ใช้ Grid 2 คอลัมน์ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* ส่วนรูปภาพ */}
        <div>
          {pet.photoUrl ? (
            // ถ้ามีรูปภาพ
            <img 
              src={pet.photoUrl} 
              alt={pet.name} 
              className="w-full max-w-md object-cover rounded"
            />
          ) : (
            // ถ้าไม่มีรูปภาพ
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
              No image available
            </div>
          )}
        </div>
        
        {/* ส่วนข้อมูล Text */}
        <div className="space-y-4">
          
          {/* ชื่อสัตว์ */}
          <div>
            <h2 className="font-bold">Name</h2>
            <p>{pet.name}</p>
          </div>
          
          {/* วันเกิด */}
          <div>
            <h2 className="font-bold">Birthdate</h2>
            <p>
              {pet.birthdate ? new Date(pet.birthdate).toLocaleDateString() : "Not specified"}
            </p>
          </div>
          
          {/* หมวดหมู่ */}
          <div>
            <h2 className="font-bold">Category</h2>
            <p>{pet.category}</p>
          </div>
          
          {/* เพศ */}
          <div>
            <h2 className="font-bold">Sex</h2>
            <p>{pet.sex || "Not specified"}</p>
          </div>
          
          {/* คำอธิบาย */}
          <div>
            <h2 className="font-bold">Description</h2>
            <p>{pet.description}</p>
          </div>
          
          {/* เจ้าของสัตว์เลี้ยง */}
          <div>
            <h2 className="font-bold">Owner</h2>
            <p>Name: {pet.owner?.name}</p>
            <p>Email: {pet.owner?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
