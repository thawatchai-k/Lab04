// app/components/AvStarCard.tsx

import React from "react";
import { Link } from "@remix-run/react";

// กำหนด interface สำหรับข้อมูลดารา AV
interface AvStarProps {
  starId: string;       // รหัสของดารา AV
  starName: string;     // ชื่อของดารา AV
  starCategory: string; // หมวดหมู่ของดารา AV
  starDesc: string;     // คำอธิบายของดารา AV
  starBirthdate: string; // วันเกิดของดารา AV
  starDebutYear: boolean; // ใช้ boolean แทนปีที่เปิดตัว
}

// คอมโพเนนต์ AvStarCard สำหรับแสดงการ์ดข้อมูลดารา AV
const AvStarCard: React.FC<AvStarProps> = ({
  starId,
  starName,
  starCategory,
  starDesc,
  starBirthdate,
  starDebutYear,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden border-2 border-black p-4 bg-white shadow-md">
      <div className="text-gray-800 text-xl font-semibold">{starName}</div>
      <div className="text-gray-600 text-base">หมวดหมู่: {starCategory}</div>
      <div className="text-gray-600 text-sm mt-2">เกิดเมื่อ: {starBirthdate}</div>
      <div className="text-gray-600 text-sm">
        {/* แสดงสถานะการเปิดตัว */}
        {starDebutYear ? "เปิดตัวในวงการ AV" : "ยังไม่ได้เปิดตัว"}
      </div>
      <div className="text-gray-700 mt-2">{starDesc}</div>

      {/* ปุ่มสำหรับดูรายละเอียดเพิ่มเติม */}
      <div className="mt-4 text-center">
        <Link
          to={`/avstar/${starId}`}
          className="text-blue-500 hover:text-blue-700 border-2 border-black px-3 py-1 bg-blue-100 rounded-md"
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
};

export default AvStarCard;
