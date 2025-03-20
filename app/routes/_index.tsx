/*ธวัชชัย ครุธนวม 026740491802-6*/
// ====== Import Dependencies ======
import { Link } from "@remix-run/react"; // ใช้สำหรับสร้าง navigation link

// ====== React Component สำหรับหน้า Index ======
export default function Index() {
  return (
    <div className="container mx-auto p-4 bg-gray-800">
      {/* หัวข้อหลัก */}
      <h1 className="text-2xl font-bold mb-4 text-white">Pet Hospital Management</h1>
      
      {/* Navigation menu */}
      <nav className="flex gap-4">
        {/* ปุ่ม Add New Pet */}
        <Link
          to="/pets/MyPetForm" // ลิงก์ไปหน้าเพิ่มสัตว์เลี้ยง
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Pet
        </Link>
        
        {/* ปุ่ม View Pet List */}
        <Link
          to="/pets/MyPetList" // ลิงก์ไปหน้ารายการสัตว์เลี้ยง
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Pet List
        </Link>
      </nav>
    </div>
  );
}
