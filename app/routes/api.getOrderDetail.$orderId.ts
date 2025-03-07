// นำเข้าฟังก์ชัน json จากไลบรารี @remix-run/node ซึ่งใช้ในการสร้างการตอบกลับ HTTP ในรูปแบบ JSON
import { json } from "@remix-run/node";

// นำเข้า type LoaderFunction จากไลบรารี @remix-run/node เพื่อใช้กำหนดประเภทของฟังก์ชัน loader
import { type LoaderFunction } from "@remix-run/node";

// นำเข้าข้อมูล 'orders' จากไฟล์ utils/orders ซึ่งเก็บข้อมูลเกี่ยวกับคำสั่งซื้อทั้งหมด
import { orders } from "~/utils/orders";

// ประกาศฟังก์ชัน loader ที่เป็น async function ซึ่งใช้ในการโหลดข้อมูลคำสั่งซื้อเฉพาะตัวตาม orderId ที่ส่งมาใน params
export const loader: LoaderFunction = async ({ params }) => {
  // ดึงค่า orderId จาก params
  const { orderId } = params;

  // ค้นหาคำสั่งซื้อในอาร์เรย์ orders โดยใช้ orderId ที่ตรงกับตัวแปร orderId ที่ส่งมา
  const order = orders.find((b) => b.orderNo === orderId);

  // ถ้าหากไม่พบคำสั่งซื้อที่ตรงกับ orderId, คืนค่าข้อความ error พร้อมสถานะ HTTP 404 (ไม่พบ)
  if (!order) {
    return json({ error: "Book not found" }, { status: 404 });
  }

  // ถ้าพบคำสั่งซื้อที่ตรงกับ orderId, คืนค่าข้อมูลของคำสั่งซื้อในรูปแบบ JSON
  return json(order);
};
