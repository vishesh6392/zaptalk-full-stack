const express=require("express");
 const isAuth=require("../middlewars/isAuth");
const multer=require("multer");
const { getMessages, sendMessage } = require("../controllers/message.controller");
const { upload } = require("../middlewars/multer");

const messageRouter=express.Router();


 messageRouter.get("/get/:reciverId", isAuth, getMessages )
 messageRouter.post("/send/:reciverId", isAuth,upload.single("image"),sendMessage )

 module.exports=messageRouter;

