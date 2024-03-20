import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI)
        console.log("connection success")
    }catch(err){
        console.log("error" + err)
    }
};

export default connectMongoDB