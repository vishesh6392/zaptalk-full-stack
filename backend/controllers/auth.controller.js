 const  User=require("../model/userModel");
    const  bcrypt=require("bcrypt");
    const  jwt=require("jsonwebtoken");
    
   const genToken = require("../config/jwt-token");




 const signup= async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        // console.log(req.body);
        
       const user = await User.findOne({
                    $or: [{ email }, { username }]
                 });

        // console.log(user);
        
        if(user){
             return  res.status(400).json({ message: "User already exists" });
        }
        if(password.length<6){
           return res.status(400).json({ message: "create strong password" });
        }
        const hashedPassword=await bcrypt.hash(password,10,)
         const userModel=await User.create({
            username,
            email,
            password:hashedPassword,
        })

        const token= await genToken(userModel._id);
        // console.log(token);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"none",
            secure:true,
        })
        // console.log(userModel);
        return res.status(201).json(userModel)



        
    } catch (error) {
         res.send(error.message)
     }
}

 const login= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
      
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({ message: "something went wrong" });
        }

        
       

        const token= await genToken(user._id);
        console.log(token);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"none",
            secure:true,
        })
        console.log(user);
        return res.status(201).json(user)



        
    } catch (error) {
         res.send("login error",error.message)
     }
}

 const logout=async(req,res)=>{
    try {
        res.clearCookie("token",{
            sameSite:"none",
            secure:true,   
        });
         res.status(200).json({ message: "logout successfully" });
    }
    catch(err){
         res.status(500).send(err.message)

    } 
}
module.exports={signup,login,logout};
