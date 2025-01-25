import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";

function PageNotFound () {
    return (
    <div className="m-0">
        <MyMenu />
        <div className="m-5">
            <h1 className="text-xl font-bold p-2 mb-5 dark:text-white border-s-8 border-teal-600">Page Not Found</h1>
            <div className="flex flex-row justify-center">
            ไม่พบข้อมูลที่คุณเลือก กรุณาตรวจสอบอีกครั้ง<br/>
            <a href="/getToDoLists">[ คลิกที่นี่ ]</a>
            </div>
        </div>
        <MyFooter />
    </div>
    );
}

export default PageNotFound;