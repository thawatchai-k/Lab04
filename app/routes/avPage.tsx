// app/routes/avstars.tsx

import React from "react";
import { useLoaderData } from "@remix-run/react";
import AvStarCard from "~/components/AvStarCard";

// กำหนด interface สำหรับข้อมูลดารา AV
interface AvStar {
  starId: string;       // รหัสของดารา AV
  starName: string;     // ชื่อของดารา AV
  starDesc: string;     // คำอธิบายเกี่ยวกับดารา AV
  starBirthdate: string; // วันเกิดของดารา AV
  starDebutYear: boolean; // แทนปีที่เปิดตัวในวงการ AV ด้วยค่า boolean
  starCategory: string; // หมวดหมู่ของดารา AV
}

// ฟังก์ชัน loader ที่ใช้ดึงข้อมูลดารา AV จาก API
export const loader = async () => {
  const response = await fetch("http://localhost:5173/api/av"); // ส่งคำขอไปยัง API เพื่อดึงข้อมูลดารา AV ทั้งหมด
  const avStars: AvStar[] = await response.json(); // แปลงข้อมูล JSON ที่ได้จาก API
  return avStars; // ส่งข้อมูลดารา AV ทั้งหมดกลับไป
};

// คอมโพเนนต์ AvStarPage สำหรับแสดงรายการดารา AV ทั้งหมด
const AvStarPage = () => {
  const avStars = useLoaderData<AvStar[]>(); // รับข้อมูลดารา AV ทั้งหมดจาก loader

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">ดารา AV ที่น่าสนใจ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {avStars.map((star) => (
          <AvStarCard
            key={star.starId} // ใช้ starId เป็น key สำหรับแต่ละการ์ด
            starId={star.starId}
            starName={star.starName}
            starDesc={star.starDesc}
            starBirthdate={star.starBirthdate}
            starDebutYear={star.starDebutYear} // ส่งข้อมูล debutYear ที่เป็น boolean
            starCategory={star.starCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default AvStarPage;
