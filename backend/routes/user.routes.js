const express=require("express");
 const userRouter=express.Router();
 const {getCurrenUser,editProfile,getOthersUser}=require("../controllers/user.controller");
 const isAuth=require("../middlewars/isAuth");
const { upload } = require("../middlewars/multer");
const multer=require("multer");





//    console.log("isAuth type:", typeof isAuth);
//  console.log("getCurrenUser type:", typeof getCurrenUser);
//   console.log("editProfile type:", typeof editProfile)
  userRouter.get("/others",isAuth,getOthersUser);
  userRouter.get("/current",isAuth,getCurrenUser);
  userRouter.post('/edit',isAuth,upload.fields([{name:'image'},{name:'coverPhoto'}]),editProfile)




 module.exports=userRouter;

