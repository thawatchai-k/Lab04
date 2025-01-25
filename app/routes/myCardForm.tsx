import { useState } from "react";

export default function MyCardForm () {
    const [myName, setMyName] = useState('');
    const [myStatus, setMyStatus] = useState(true);
    const [myMajor, setMyMajor] = useState('');
    const [myTemplate, setMyTemplate] = useState('');
    
    const [myIndex, setIndex] = useState(0);
    const [myCards, setMyCards] = useState([]); // Empty array

    function handleSubmit (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        console.log(formJson);

        setMyCards([
            ...myCards,  // Spread syntax
            {
                id: myIndex,
                name: formJson.myName
            }
        ]);
        setIndex(myIndex+1);
    }

    return (
    <div className="m-3">
    <form method="post" onSubmit={handleSubmit}>
    <label className="text-lg font-bold">
    การเพิ่มข้อมูลนามบัตร
    </label><hr />
    <p>
        ชื่อ-สกุล: 
        <input type="text" name="myName" className="border border-blue-300" 
            onChange={(e) => setMyName(e.target.value)} 
        />
    </p>
    <p>
        สถานะนามบัตร: 
        <input type="checkbox" name="myStatus" defaultChecked={true} 
            className="border border-blue-300" 
            onChange={(e) => setMyStatus(e.target.checked)}
        />
    </p>
    <p>
        สาขาวิชา:<br />
        <input type="radio" name="myMajor" value="IT" 
            onChange={(e) => setMyMajor(e.target.value)} />
        <label className="m-2">เทคโนโลยีสารสนเทศ</label><br />
        <input type="radio" name="myMajor" value="CS" 
            onChange={(e) => setMyMajor(e.target.value)} />
        <label className="m-2">วิทยาการคอมพิวเตอร์</label><br />
        <input type="radio" name="myMajor" value="DBI" 
            onChange={(e) => setMyMajor(e.target.value)} />
        <label className="m-2">นวัตกรรมธุรกิจดิจิทัล</label><br />
    </p>
    <p>
        รูปแบบนามบัตร:<br />
        <select name="myTemplate" className="border border-blue-200"
            onChange={(e)=>setMyTemplate(e.target.value)}
        >
            <option value="">--เลือกรูปแบบ--</option>
            <option value="bg-red-300">Apple</option>
            <option value="bg-yellow-300">Banana</option>
            <option value="bg-orange-300">Orange</option>
        </select>
    </p>
    <hr />
    <p>
        <button type="submit" className="bg-green-300 m-2 p-2">บันทึกข้อมูล</button>
        <button type="reset" className="bg-red-300 m-2 p-2">เคลียร์ข้อมูล</button>
    </p>
    </form>
    <hr />
    <p>
        <label className="text-lg font-bold">
        ข้อมูลนามบัตรจาก Object Array
        </label>
        <p className="border border-blue-300 rounded-lg p-3 m-2">
            <ul>
                {
                    myCards.map((item, index) => (
                        <li key={index}>{item.name+'  '}
                            <button className="bg-red-300 p-2 m-2" onClick={()=>{
                                setMyCards(
                                    myCards.filter((tmp) => tmp.id !== item.id)
                                )
                            }}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </p>
    </p>
    <p>
        <label className="text-lg font-bold">
        ข้อมูลนามบัตร
        </label>
        <p className={
                    myTemplate !== '' ? 'border border-green-300 rounded-lg p-3 m-2 '+myTemplate : 'border border-green-300 rounded-lg p-3 m-2'
                }>
            <p>
                ชื่อ-สกุล: {myName !== '' ? myName : "กรุณากรอกชื่อ-สกุล!" }
            </p>
            <p>
                สถานะนามบัตร: {myStatus ? "[/] เปิดใช้งาน" : "[X] ยังไม่เปิดใช้งาน" }
            </p>
            <p>
                สถานะนามบัตร: {myMajor !== '' ? myMajor : "กรุณาเลือกสาขาวิชา!" }
            </p>
        </p>
    </p>
    </div>
    );
}