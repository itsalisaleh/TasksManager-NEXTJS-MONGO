"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


const Edittaskform = ({id,title,description})=> {
        const [newTitle,setNewTitle] = useState(title)
        const [newDescription,setNewDescription] = useState(description)
        const router = useRouter();
        const handleSubmit = async (e) => {
                e.preventDefault();

                try {
                       const res = await fetch(`http://localhost:3000/api/tasks/${id}`,{
                        method: "PUT",
                        headers: {
                                "Content-type": "application/json"
                        },
                        body: JSON.stringify({newTitle,newDescription})
                       });
                       
                       if(!res.ok) {
                                throw new Error("failed to update the task")
                       }
                       router.push('/')
                       router.refresh();
                } catch (error) {
                        console.log(error)
                }
        }
        
        return (
         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
            onChange={e => setNewTitle(e.target.value)}
            value={newTitle}
            className="border border-slate-500 px-8 py-2" 
            type="text" 
            placeholder="Task title" />
            
            <input className="border border-slate-500 px-8 py-2"
            onChange={e => setNewDescription(e.target.value)}
            value={newDescription}
            type="text" 
            placeholder="Task description" />
            
            <button className="bg-green-600 text-white py-3 px-6 w-fit font-bold">
                Update Task
                </button>
        </form>
        )
}

export default Edittaskform