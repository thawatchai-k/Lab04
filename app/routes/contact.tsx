import { useState } from "react";
import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";

function MyContact () {
    return (
    <div className="m-0">
        <MyMenu />
        <div className="m-5">
            <h1 className="text-xl font-bold p-2 mb-5 dark:text-white border-s-8 border-teal-600">ติดต่อฉัน</h1>
            <div className="flex flex-row justify-center">
            ธวัชชัย ครุธนวม<br/>
            Thawatchai Krutnaum<br/>
            </div>
        </div>
        <MyFooter />
    </div>
    );
}

export default MyContact;