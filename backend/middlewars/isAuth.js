const jwt = require('jsonwebtoken');

const dotenv=require("dotenv");
dotenv.config();

const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
            if(!token){
                return res.status(400).json({message:"Invalid Credentials/not authicated"});
            }
             let verifyToken=jwt.verify(token,process.env.SECRET_KEY);
             //console.log(verifyToken);
             req.userId=verifyToken.userId;
             next();

        }
        catch(err){
          return res.status(500).json({message:`auth error:${err.message}`});
        }
    }
     module.exports=isAuth;
    
