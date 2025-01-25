import React, { useState } from "react";
import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";
import { useParams } from "@remix-run/react";

function App() {
    const myParams = useParams();
    const tdId = myParams.tid;

    return (
    <>
    <MyMenu />
    <div className="m-5">
        <h2 className="p-2 mb-5 text-2xl font-bold dark:text-white border-s-8 border-teal-600">ข้อมูลรายการที่ต้องทำ</h2>
        <div className="p-2">
            รหัสรายการ: {tdId}<br />
        </div>
    </div>
    <MyFooter />
    </>
    );
}

export default App;