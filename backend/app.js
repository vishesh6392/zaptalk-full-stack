const express=require("express");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const dotEvn=require("dotenv");
const db = require("./config/db-con");
const cors=require("cors");
const AuthRouter=require("./routes/auth.routes");
const config = require("config");
dotEvn.config();
const userRouter=require("./routes/user.routes");
const messageRouter = require("./routes/message.routes");
 const { app, io, server } = require("./socket/socket.js"); 
const port=process.env.PORT || 5000;


app.use(cors({
    origin:["https://zaptalk-men.onrender.com"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/auth",AuthRouter);
app.use("/user",userRouter);
app.use("/message",messageRouter);


app.get('/',(req,res)=>{
    res.send("hey");
})

server.listen(port,()=>{
     db();
    console.log("connected to server")
})
