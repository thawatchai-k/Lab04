import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";
import { useState } from "react";

export default function MyCalculator() {
    const [countPlus1, setCountPlus1] = useState(0);
    const [countMul1, setCountMul1] = useState(0);

    const handleCountPlus1 = () => {
        //alert('Count plus 1....');
        setCountPlus1(countPlus1 + 1);
    } 

    const handleCountMin1 = () => {
        setCountPlus1(countPlus1 - 1);
    } 

    return (
        <div className="m-0">
            <MyMenu />
            <div className="m-3">
            <h1>การคำนวณอย่างง่าย</h1>
            <p>
            <h1 className="text-xxl text-center">{countPlus1}</h1>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleCountPlus1}>+ 1</button>
            <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleCountMin1}>- 1</button>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>
            </p>
            </div>
            <MyFooter />
        </div>
    );
}