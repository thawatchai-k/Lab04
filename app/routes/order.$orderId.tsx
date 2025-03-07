// app/routes/book.$bookId.tsx

// นำเข้า React และ hooks ที่จำเป็นจาก Remix
import React from 'react';
import { useParams, useLoaderData, useNavigate } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';

// กำหนด interface สำหรับข้อมูลคำสั่งซื้อที่เราจะใช้ในแอป
interface order {
    orderNo: string;       // หมายเลขคำสั่งซื้อ
    confirmDate: string;   // วันที่ยืนยันคำสั่งซื้อ
    orderStatus: string;   // สถานะของคำสั่งซื้อ
    priceTotal: string;    // ราคารวมของคำสั่งซื้อ
    customer: string;      // ชื่อลูกค้าที่ทำคำสั่งซื้อ
  }

// ฟังก์ชัน loader ที่จะโหลดข้อมูลคำสั่งซื้อจาก API โดยใช้ orderId ที่มาจาก URL params
export const loader: LoaderFunction = async ({ params }) => {
  const { orderId } = params; // รับค่า orderId จาก URL
  const response = await fetch(`http://localhost:5173/api/getOrderDetail/${orderId}`); // ส่งคำขอไปยัง API เพื่อดึงข้อมูลคำสั่งซื้อ
  const order: order = await response.json(); // แปลงข้อมูล JSON ที่ได้จาก API
  return json(order); // ส่งข้อมูลคำสั่งซื้อที่ได้กลับไปในรูปแบบ JSON
};

// คอมโพเนนต์ BookDetail สำหรับแสดงรายละเอียดคำสั่งซื้อ
const BookDetail = () => {
  const { orderNo, confirmDate, orderStatus, priceTotal, customer } = useLoaderData<order>(); // รับข้อมูลคำสั่งซื้อจาก loader
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทางไปยังหน้าก่อนหน้า

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl my-4 font-bold mb-6">รายการคำสั่งซื้อ</h1> {/* ชื่อหัวข้อของหน้ารายละเอียดคำสั่งซื้อ */}
      <div className="p-4 my-4 border-2">    
          {/* แสดงข้อมูลรายละเอียดของคำสั่งซื้อ */}
          <p className="text-gray-600">วันที่: {confirmDate}</p>
          <p className="text-gray-600">ราคารวม: {priceTotal}</p>
          <p className="text-gray-600">สถานะ: {orderStatus}</p>
          <p className="text-gray-600">ผู้สั่งซื้อ: {customer}</p>            
      </div>
      {/* เพิ่มปุ่มย้อนกลับเพื่อให้ผู้ใช้สามารถกลับไปหน้าก่อนหน้าได้ */}
      <button
        onClick={() => navigate(-1)} // เมื่อคลิกปุ่มจะย้อนกลับไปยังหน้าก่อนหน้า
        className="my-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        ย้อนกลับ
      </button>    
    </div>
  );
};

export default BookDetail;
