// app/routes/api.getavstar.ts

// นำเข้าฟังก์ชัน json จากไลบรารี @remix-run/node ซึ่งใช้ในการสร้างการตอบกลับ HTTP ในรูปแบบ JSON
import { json } from "@remix-run/node";

// นำเข้า type LoaderFunction จากไลบรารี @remix-run/node เพื่อใช้กำหนดประเภทของฟังก์ชัน loader
import { type LoaderFunction } from "@remix-run/node";

// นำเข้าข้อมูล 'avStars' จากไฟล์ utils/avStars ซึ่งเก็บข้อมูลเกี่ยวกับดารา AV ทั้งหมด
import { avStars } from "~/utils/avStars";

// ประกาศฟังก์ชัน loader ที่เป็น async function ซึ่งใช้ในการโหลดข้อมูลดารา AV ตาม starId ที่ส่งมาใน params
export const loader: LoaderFunction = async ({ params }) => {
  // ดึงค่า starId จาก params
  const { starId } = params;

  // ค้นหาดารา AV ในอาร์เรย์ avStars โดยใช้ starId ที่ตรงกับตัวแปร starId ที่ส่งมา
  const star = avStars.find((s) => s.starId === starId);

  // ถ้าหากไม่พบดารา AV ที่ตรงกับ starId, คืนค่าข้อความ error พร้อมสถานะ HTTP 404 (ไม่พบ)
  if (!star) {
    return json({ error: "AV Star not found" }, { status: 404 });
  }

  // ถ้าพบดารา AV ที่ตรงกับ starId, คืนค่าข้อมูลของดารา AV ในรูปแบบ JSON
  return json(star);
};
