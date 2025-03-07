// app/routes/books.tsx

// นำเข้า React และ useLoaderData hook จาก Remix สำหรับการดึงข้อมูลจาก loader
import React from 'react';
import { useLoaderData } from '@remix-run/react';

// นำเข้าคอมโพเนนต์ OrderCard ที่ใช้แสดงการ์ดคำสั่งซื้อในแต่ละรายการ
import OrderCard from '~/components/OrdersCard';

// กำหนด interface สำหรับข้อมูลคำสั่งซื้อที่เราจะใช้
interface orders {
    orderNo: string;       // หมายเลขคำสั่งซื้อ
    confirmDate: string;   // วันที่ยืนยันคำสั่งซื้อ
    orderStatus: string;   // สถานะของคำสั่งซื้อ
}

// ฟังก์ชัน loader ที่ใช้ดึงข้อมูลคำสั่งซื้อจาก API
export const loader = async () => {
  const response = await fetch('http://localhost:5173/api/getOrders'); // ส่งคำขอไปยัง API เพื่อดึงข้อมูลคำสั่งซื้อทั้งหมด
  const orders: orders[] = await response.json(); // แปลงข้อมูล JSON ที่ได้จาก API
  return orders; // ส่งข้อมูลคำสั่งซื้อทั้งหมดกลับไป
};

// คอมโพเนนต์ OrderPage สำหรับแสดงรายการคำสั่งซื้อทั้งหมด
const OrderPage = () => {
  const orders = useLoaderData<orders[]>(); // รับข้อมูลคำสั่งซื้อทั้งหมดจาก loader

  return (
    <div className="container mx-auto p-4">
      {/* หัวข้อของหน้ารายการคำสั่งซื้อ */}
      <h1 className="text-4xl font-bold mb-6">รายการคำสั่งซื้อ</h1>

      {/* ใช้ grid layout เพื่อจัดเรียงการ์ดคำสั่งซื้อ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* วนลูปผ่านคำสั่งซื้อและแสดงการ์ดสำหรับแต่ละคำสั่งซื้อ */}
        {orders.map((order) => (
          <OrderCard
            key={order.orderNo}  // ใช้ orderNo เป็น key สำหรับแต่ละการ์ด
            orderNo={order.orderNo}  // ส่งหมายเลขคำสั่งซื้อ
            confirmDate={order.confirmDate}  // ส่งวันที่ยืนยันคำสั่งซื้อ
            orderStatus={order.orderStatus}  // ส่งสถานะของคำสั่งซื้อ
          />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
