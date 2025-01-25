import { toDoItems } from "./toDoLists";
import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";
import { useState } from "react";

function CompletedCheck ({c} : {c: boolean}) {
    // if(c)
    //     return <span>👍{`\u{1F44D}`}</span>;
    // return <span>👎{`\u{1F44E}`}</span>;
    return (
        <span>
        {c ? `\u{1F44D}` : `\u{1F44E}`}
        </span>
    );
}

export default function ToDoLists() {
    const [cpStatus, setStatus] = useState(null);

    const cpToDoItems = toDoItems.filter(cpToDo => {
        if(cpStatus === null) return true;
        return cpToDo.completed === cpStatus;
    });

    const handleComplete = (st: any) => {
        setStatus(st);
    }

    const listItems = cpToDoItems.map((item, index) =>
        <div className="m-3" key={index}>
          <a href={`/getToDoList/${item.id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <b className="text-base">
        <CompletedCheck c={item.completed} />
    </b>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title+" (รหัส: "+item.id+")"}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{item.created}</p>
        </a>
    </div> 
    );

    return (
        <div className="m-0">
            <MyMenu />
            <div className="m-5">
            <h1 className="text-xl font-bold p-2 mb-5 dark:text-white border-s-8 border-teal-600">สิ่งที่ต้องทำ...</h1>
            <div className="flex flex-row justify-center">
            <span className="me-2 mb-2 p-3">สถานะดำเนินการ:</span>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>handleComplete(null)}>All</button>
            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>handleComplete(true)}>Completed</button>
            <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"   onClick={()=>handleComplete(false)}>Incomplete</button>
            </div>
            {listItems}
            </div>
            <MyFooter />
        </div>
    );
} 