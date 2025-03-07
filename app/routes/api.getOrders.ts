// app/routes/api.getbooks.ts

// นำเข้าฟังก์ชัน json จากไลบรารี @remix-run/node ซึ่งใช้ในการสร้างการตอบกลับ HTTP ในรูปแบบ JSON
import { json } from "@remix-run/node";

// นำเข้าข้อมูล 'orders' จากไฟล์ utils/orders ซึ่งเก็บข้อมูลเกี่ยวกับคำสั่งซื้อทั้งหมด
import { orders } from "~/utils/orders";

// ประกาศฟังก์ชัน loader ที่เป็น async function ซึ่งใช้ในการโหลดข้อมูลคำสั่งซื้อทั้งหมด
export const loader = async () => {
  
  // คืนค่าการตอบกลับเป็น JSON ที่มีข้อมูล 'orders'
  return json(orders);
};
