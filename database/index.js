import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

const connectMongo=async () =>{
    try {
    const  connectInstance = await mongoose.connect(`${process.env.MONGOODB_URL}/${DB_NAME}`)
    console.log(`\nMongoDB Connection !! DB Host : ${connectInstance.connection.host}`)
    } catch (error) {
        console.log("MongooDB Failed : ", error)
        process.exit(1);
    }
}

export default connectMongo