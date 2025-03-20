/*ธวัชชัย ครุธนวม 026740491802-6*/
// นำเข้า Form component จาก Remix
import { Form } from "@remix-run/react";

// สร้าง Component สำหรับฟอร์มเพิ่มสัตว์เลี้ยงใหม่
export default function MyPetForm() {
  return (
    <div className="container mx-auto p-4">
      {/* หัวข้อ */}
      <h1 className="text-2xl font-bold mb-4">Add New Pet</h1>

      {/* เริ่มต้น Form โดยใช้ method POST */}
      <Form method="post" className="space-y-4">
        
        {/* ===== Input: Pet Name ===== */}
        <div>
          <label htmlFor="name" className="block mb-1">Pet Name</label>
          <input 
            type="text"         // ชนิด text input
            id="name"           // id สำหรับเชื่อมกับ label
            name="name"         // name สำหรับส่งค่าไป backend
            className="w-full p-2 border rounded" // ตกแต่งด้วย Tailwind
            required           // กำหนดให้ต้องกรอก
          />
        </div>
        
        {/* ===== Select: Pet Type ===== */}
        <div>
          <label htmlFor="type" className="block mb-1">Pet Type</label>
          <select 
            id="type" 
            name="type" 
            className="w-full p-2 border rounded"
            required            // ต้องเลือกประเภทสัตว์เลี้ยง
          >
            <option value="">-- Select Type --</option> {/* ตัวเลือกว่าง */}
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        {/* ===== ปุ่ม Submit ===== */}
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Pet
        </button>

      </Form>
    </div>
  );
}
