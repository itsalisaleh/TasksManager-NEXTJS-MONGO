import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {title, description} = await req.json();
    await connectMongoDB();
    await Task.create({title,description})
    return NextResponse.json({message: "Task Created"},{status: 201})
}

export async function GET() {
    await connectMongoDB();
    const allTasks = await Task.find();
    return NextResponse.json({allTasks});
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({message: "Task Deleted"})
}