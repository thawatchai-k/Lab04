/*ธวัชชัย ครุธนวม 026740491802-6*/
// ====== Import Dependencies ======
import { useLoaderData, Link } from "@remix-run/react"; // สำหรับ data fetching และ navigation
import { db } from "~/config/firebase"; // import firebase config (Firestore)
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import { json } from "@remix-run/node"; // สำหรับส่ง JSON response

// ====== Loader Function ======
export async function loader() {
  try {
    // เข้าถึง collection ชื่อ "pets"
    const petsCollection = collection(db, "pets");
    // ดึงข้อมูลทั้งหมดใน collection
    const petsSnapshot = await getDocs(petsCollection);
    
    // แปลงข้อมูลเป็น array ของ object
    const petsList = petsSnapshot.docs.map(doc => ({
      id: doc.id,               // เก็บ id ของแต่ละ document
      ...doc.data(),            // กระจายข้อมูล field ต่าง ๆ
      birthdate: doc.data().birthdate || "" // จัดการกรณีไม่มี birthdate
    }));
    
    // ส่งข้อมูลกลับไป frontend
    return json({ pets: petsList });
  } catch (error) {
    // หากเกิด error ส่ง array ว่างและ error message
    return json({ pets: [], error: "Failed to load pets" });
  }
}

// ====== React Component ======
export default function MyPetList() {
  const { pets, error } = useLoaderData(); // รับ data จาก loader

  return (
    <div className="container mx-auto p-4">
      {/* หัวข้อ */}
      <h1 className="text-2xl font-bold mb-4">Pet List</h1>
      
      {/* แสดง error หากมี */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* ปุ่มเพิ่มสัตว์เลี้ยง */}
      <div className="mb-4">
        <Link 
          to="/pets/MyPetForm" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add new pet
        </Link>
      </div>
      
      {/* ตารางแสดงรายการสัตว์เลี้ยง */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Photo</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Birthdate</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Sex</th>
            <th className="border p-2">Owner Name</th>
            <th className="border p-2">Owner E-mail</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* กรณีไม่มีข้อมูล */}
          {pets.length === 0 ? (
            <tr>
              <td colSpan="8" className="border p-2 text-center">No pets found</td>
            </tr>
          ) : (
            /* กรณีมีข้อมูล */
            pets.map(pet => (
              <tr key={pet.id}>
                {/* รูปภาพ */}
                <td className="border p-2">
                  {pet.photoUrl ? (
                    <img 
                      src={pet.photoUrl} 
                      alt={pet.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                      No image
                    </div>
                  )}
                </td>
                
                {/* ชื่อ */}
                <td className="border p-2">{pet.name}</td>
                
                {/* วันเกิด */}
                <td className="border p-2">
                  {pet.birthdate ? new Date(pet.birthdate).toLocaleDateString() : ""}
                </td>
                
                {/* หมวดหมู่ */}
                <td className="border p-2">{pet.category}</td>
                
                {/* เพศ */}
                <td className="border p-2">{pet.sex}</td>
                
                {/* เจ้าของ */}
                <td className="border p-2">{pet.owner?.name}</td>
                
                {/* E-mail เจ้าของ */}
                <td className="border p-2">{pet.owner?.email}</td>
                
                {/* ลิงก์ไปหน้าแสดงรายละเอียดสัตว์เลี้ยง */}
                <td className="border p-2">
                  <Link 
                    to={`/pets/MyPetList/${pet.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    [View]
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
