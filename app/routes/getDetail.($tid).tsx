import { useState } from "react";
import { useParams, useNavigate } from "@remix-run/react";
import { toDoItems } from "./toDoLists";
import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";

function GetDetail () {
    const myParams = useParams();
    const todl_id = myParams.tid;
    const navigate = useNavigate();

    const tdItem = toDoItems.filter((item) => 
        item.id == todl_id
    );

    console.log(tdItem);

    const handleNotFound = () => {
        navigate('/PageNotFound');
    }

    return (
    <div className="m-0">
        <MyMenu />
        <div className="m-5">
            <h1 className="text-xl font-bold p-2 mb-5 dark:text-white border-s-8 border-teal-600">รายละเอียดข้อมูลที่ต้องทำ</h1>
            <div className="p-5 flex flex-row justify-start">
            {
                tdItem.length === 0 ? 
                ( 
                    <a onClick={handleNotFound}>[ กรุณาคลิกที่นี่ ]</a>
                ) 
                :
                (
                    <>
                        รหัสข้อมูล: {tdItem[0].id}<br/>
                        หัวข้อ: {tdItem[0].title}<br/>
                        วันที่สร้าง: {tdItem[0].created}<br/>
                        สถานะ: {tdItem[0].completed}<br/>
                    </>
                )
            }
            </div>
            <div className="mt-3">
            <a href="/getToDoLists" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">ย้อนกลับ</a>
            </div>
        </div>
        <MyFooter />
    </div>
    );
}

export default GetDetail;