import React from "react";
import { Link } from "@remix-run/react";

// กำหนด interface สำหรับข้อมูลดารา AV
interface AvStarProps {
  starId: string; // รหัสของดารา AV
  starName: string; // ชื่อของดารา AV
  starCategory: string; // หมวดหมู่ของดารา AV
  starDesc: string; // คำอธิบายของดารา AV
}

// คอมโพเนนต์ AvStarCard สำหรับแสดงรายละเอียดดารา AV
const AvStarCard: React.FC<AvStarProps> = ({ starId, starName, starCategory, starDesc }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden border-2 border-gray-300 shadow-md bg-white">
      <div className="px-6 py-4">
        {/* แสดงชื่อดารา AV */}
        <div className="text-lg font-semibold text-gray-800">{starName}</div>
        {/* แสดงหมวดหมู่ของดารา */}
        <div className="text-gray-700 text-base">หมวดหมู่: {starCategory}</div>
        {/* แสดงคำอธิบายของดารา */}
        <div className="text-gray-700 text-sm">{starDesc}</div>

        {/* ปุ่มลิงก์สำหรับดูรายละเอียดเพิ่มเติม */}
        <div className="mt-4 text-center">
          <Link
            to={`/avstar/${starId}`}
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md inline-block transition duration-200"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvStarCard;
