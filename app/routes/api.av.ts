// app/routes/api.getavstars.ts

// นำเข้าฟังก์ชัน json จากไลบรารี @remix-run/node ซึ่งใช้ในการสร้างการตอบกลับ HTTP ในรูปแบบ JSON
import { json } from "@remix-run/node";

// นำเข้าข้อมูล 'avStars' จากไฟล์ utils/avStars ซึ่งเก็บข้อมูลเกี่ยวกับดารา AV ทั้งหมด
import { avStars } from "~/utils/avStars";

// ประกาศฟังก์ชัน loader ที่เป็น async function ซึ่งใช้ในการโหลดข้อมูลดารา AV ทั้งหมด
export const loader = async () => {
  
  // คืนค่าการตอบกลับเป็น JSON ที่มีข้อมูล 'avStars'
  return json(avStars);
};
