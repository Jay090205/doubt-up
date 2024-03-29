import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        index : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        require:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
userSchema.pre("save",async function(next){
    if(!this.password.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next();
})
userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.method.generateAccesToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User= mongoose.model("User",userSchema)