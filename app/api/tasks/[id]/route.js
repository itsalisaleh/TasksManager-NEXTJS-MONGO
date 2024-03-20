import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function PUT(req,{params}) {
    const {id} = params;
    const {newTitle: title, newDescription: description} = await req.json();
    await connectMongoDB();
    await  Task.findByIdAndUpdate(id, {title,description});
    return NextResponse.json({message: "Task Updated"});
}

export async function GET(req, {params}) {
    const {id} = params;
    await connectMongoDB(); 
    const task = await Task.findOne({_id: id});
    return NextResponse.json({task},{status: 200});
}