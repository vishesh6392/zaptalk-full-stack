

 const User=require("../model/userModel");
const cloudinary=require("../config/cloudinary");
const {uploadOncloudinary} = require("../config/cloudinary");
const path=require("path")




 const getCurrenUser=async(req,res)=>{
    try{
       let userid=req.userId;
       let user=await User.findById(userid).select("-password");
       if(!user){
        return res.status(400).json({message:"User not found"});
       }
       else{
        return res.status(200).json(user);
       }


    }
    catch(err){
     return res.status(500).json({message:"usercontrollder error",err:err.message});
    
    }
}
//  

const editProfile = async (req, res) => {
  try {
    
    // Extracting form data
    const { name, livesin, about } = req.body;
    // console.log(" Received form data:", { name, livesin, about });

    // Validate required fields
    if (!name) {
      // console.log("Name is missing in form data");
      return res.status(400).json({ message: "Name is required" });
    }

    // Log incoming files from Multer
    // console.log(" Multer files received:", req.files);

    // Initialize Cloudinary image URLs
    let imageUrl = null;
    let coverPhotoUrl = null;

    // Check and upload profile image
    if (req.files?.image?.[0]) {
      const profilePath = req.files.image[0].path;
      // console.log(" Uploading profile image from:", profilePath);
      imageUrl = await uploadOncloudinary(profilePath);
      // console.log(" Uploaded profile image URL:", imageUrl);
    } else {
      // console.log(" No profile image file provided");
    }

    // Check and upload cover photo
    if (req.files?.coverPhoto?.[0]) {
      const coverPath = req.files.coverPhoto[0].path;
      // console.log(" Uploading cover photo from:", coverPath);
      coverPhotoUrl = await uploadOncloudinary(coverPath);
      // console.log("Uploaded cover photo URL:", coverPhotoUrl);
    } else {
      // console.log(" No cover photo file provided");
    }

    // Construct update object
    const updateData = {
      name,
      about,
      livesin,
    };

    if (imageUrl) updateData.image = imageUrl;
    if (coverPhotoUrl) updateData.coverPhoto = coverPhotoUrl;

    // console.log("Final update object:", updateData);

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      // console.log(" User not found in DB");
      return res.status(400).json({ message: "User not found" });
    }

    // console.log("Profile successfully updated:", updatedUser);
    return res.status(200).json(updatedUser);

  } catch (error) {
    // console.error(" Error in editProfile:", error.message);
    return res.status(500).json({ message: "Server error in editProfile", error: error.message });
  }
};



const getOthersUser=async(req,res)=>{
    try{
       let userid=req.userId;
       let user=await User.find({
         _id:{$ne:userid}
       }).select("-password");
       if(!user){
        return res.status(400).json({message:"User not found"});
       }
       else{
        return res.status(200).json(user);
       }


    }
    catch(err){
     return res.status(500).json({message:"usercontrollder getOthersUser error",err:err.message});
    
    }
}
 const getOnSearch=async(req,res)=>{
    try{
       let search=req.query
      //  console.log(search);
       if(!search) return res.status(400).json({message:"search is required"});
       let user=await User.find({
         $or:[
          {name:{$regex:search.query,$options:"i"}},
          {username:{$regex:search.query,$options:"i"}}
         ]
        }).select("-password");
        // console.log(user);
        res.status(200).json(user);
      }
       catch(e){
         res.status(500).json({message:"usercontrollder getOnSearch error",err:e.message});
       }
    } 


  module.exports={editProfile,getCurrenUser,getOthersUser,getOnSearch};