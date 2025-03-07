
import React from 'react';
import { Link } from '@remix-run/react';

interface BookProps {
  orderNo: string;
  confirmDate: string;
  orderStatus: string;
}

const BookCard: React.FC<BookProps> = ({ orderNo, confirmDate, orderStatus }) => {
  return (
<div className="max-w-sm rounded overflow-hidden border-2 border-black">
  <div className="px-6 py-4">
    <div className="text-gray-700 text-base">รหัสคำสั่งซื้อ: {orderNo}</div>
    <div className="text-gray-700 text-base">วันที่: {confirmDate}</div>
    <div className="text-gray-700 text-base">สถาณะ: {orderStatus}</div>
    <div className="px-2 text-center text-lg border-2 border-black p-1 bg-blue-100">
      <Link to={`/order/${orderNo}`} className="text-blue-500 hover:text-blue-700">
        รายละเอียด
      </Link>
    </div>
  </div>     
</div>
  );
};

export default BookCard;
