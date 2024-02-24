import dotenv from "dotenv"
import connectMongo from "./database/index.js"
import {app} from "./app.js"
dotenv.config({
    path:'./env'
})
app.get("/jay",(req,res)=>{
    res.send("Hello Jay");
})
connectMongo().then(()=>{
    app.listen(process.env.PORT || 9000, () =>{
        console.log(`server is listing on : ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("Connection Error !!! : ",err);
})