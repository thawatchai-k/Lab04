// app/routes/api.getbooks.ts

// นำเข้าฟังก์ชัน json จากไลบรารี @remix-run/node ซึ่งใช้ในการสร้างการตอบกลับ HTTP ในรูปแบบ JSON
import { json } from "@remix-run/node";

// นำเข้าข้อมูล 'books' จากไฟล์ utils/books ซึ่งเก็บข้อมูลเกี่ยวกับหนังสือ
import { books } from "~/utils/books";

// ประกาศฟังก์ชัน loader ที่เป็น async function ซึ่งใช้ในการโหลดข้อมูลเมื่อมีการร้องขอ
export const loader = async () => {
  
  // คืนค่าการตอบกลับเป็น JSON ที่มีข้อมูล 'books'
  return json(books);
};
