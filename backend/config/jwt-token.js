const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

console.log(process.env.SECRET_KEY);

const genToken = async(userId)=>{
    try {
        const token=await jwt.sign({userId},process.env.SECRET_KEY,{
            expiresIn:"7d",
        })
        return token;
    } catch (error) {
        console.log(error);
        return res.status(500).send("internal server error")
  }
}
module.exports=genToken;

