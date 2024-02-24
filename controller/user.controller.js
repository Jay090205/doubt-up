import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {User}  from "../modul/user.module.js"
import { ApiRespons } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
const registerUser = asyncHandler( async (req,res)=>{
    const {username,email,department,password}=req.body
    console.log(email);
    if([username,email,department,password].some((filed)=>
        filed?.trim() === "")){
            throw new ApiError(400,"ALL FILED ARE REQUIRED")
        }
    const userAlreadyExist = await User.findOne({
        $or: [{username},{email}]
    })    
    if(userAlreadyExist){
        throw new ApiError(401,"User Already Exist try to register with different name or email")
    }

    const user = await User.create(
        {
            email,
            department,
            password,
            username : username.toLowercase()
        }
    )

    const createduser = await User.findById(user._id).select("-password -refreshToken")

    if(!createduser){
        throw new ApiError(100,"Something Went Worng")
    }

    return res.status(200).json(
        new ApiRespons(201,createduser,"User Succefully Register")
    ) 
})
const Hello = asyncHandler((req,res)=>{
    console.log("Hello World");
    return res.status(200).json(
        new ApiRespons(201,"Hello","Success")
    )
})
console.log("OK")
export {registerUser,Hello}