"use client"

import { useState } from "react"
import {useRouter }from "next/navigation";

const addTask = () => {
    const [title,setTitle] = useState("");
    const [description,setdescription] = useState("");

    const router = useRouter();
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        if(!title || !description){
            alert("title and description required");
            return;
        }

        try {
           const res = await fetch('http://localhost:3000/api/tasks', {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({title,description}),
            });

            if(res.ok){
                router.push('/')
            }else {
                throw new Error("failed to created the task")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input className="border border-slate-500 px-8 py-2"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            type="text" 
            placeholder="Task title" />
            
            <input className="border border-slate-500 px-8 py-2"
            onChange={(e)=> setdescription(e.target.value)}
            value={description}
            type="text" 
            placeholder="Task description" />
            
            <button type="submit" className="bg-green-600 text-white py-3 px-6 w-fit font-bold">
                Add Task
            </button>
        </form>
    )
}

export default addTask