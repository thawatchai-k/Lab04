import { toDoItems } from "./toDoLists";
import MyMenu from "./templates/mymenu";
import MyFooter from "./templates/myfooter";

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
    const cpToDoItems = toDoItems.filter(cpToDo => 
        cpToDo.completed === false
    );
    const listItems = cpToDoItems.map((item, index) =>
        <div className="m-3" key={index}>
        <a href={`/getDetail/${item.id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
                <h1 className="text-xl font-bold">สิ่งที่ต้องทำ...</h1>
                {listItems}
            </div>
            <MyFooter />
        </div>
    );
} 