import Link from "next/link"
import Removebtn from "./RemoveBtn"
import {HiPencilAlt} from "react-icons/hi"

const getTasks = async ()=> {
    try {
        const res = await fetch('http://localhost:3000/api/tasks', {
            cache: "no-cache"
        })
        if(!res.ok) {
            throw new Error("Failed to fetch tasks")
        }
        return res.json();
    } catch (error) {
        console.log("Error loading the data !!" + error)
    }
}

const Taskslist = async () => {
    const {allTasks} = await getTasks();
    
    return (
        <>
        {allTasks.map(t => (
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                <div>
                    <h2  className="font-bold text-2xl ">{t.title}</h2>
                    <div>{t.description}</div>
                </div>
                    <div className="flex gap-2 ">
                        <Removebtn id = {t._id} />
                        <Link href={`/editTask/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                
            </div>
            ))}
        </>
    )
}

export default Taskslist