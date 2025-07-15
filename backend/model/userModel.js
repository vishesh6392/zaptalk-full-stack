const mongoose=require("mongoose");

const userModel=new  mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:""
    },
    coverPhoto:{
        type:String,
        default:""
    },
    about:{
        type:String,
        default:""
    },
    livesin:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    posts:{
        type:Array,
        default:[]
    },




},{timestamps:true})
module.exports=mongoose.model("user",userModel);