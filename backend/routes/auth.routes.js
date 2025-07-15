const express=require("express");
 const AuthRouter=express.Router();
 const {signup,login, logout}=require("../controllers/auth.controller");


  AuthRouter.post("/signup",signup);
  AuthRouter.post("/login",login);
  AuthRouter.get("/logout",logout);


 module.exports=AuthRouter;

