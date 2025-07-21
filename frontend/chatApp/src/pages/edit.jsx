import React from "react";
import { BiArrowBack } from "react-icons/bi";
import profileP from "../assets/profile_photo.jpg";
import coverP from "../assets/cover_photo.jpg";
import { useState } from "react";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";



const EditProfile = () => {
      const userData=useSelector((state)=>state.user)
    let [name,setName]=useState(userData.name || "")
    let [livesin,setLivesin]=useState(userData.livesin || "")
    let [about,setAbout]=useState(userData.about || "")
    let [saving,setSaving]=useState(false)
    let [backendImage,setBackendImage]=useState( null)
    let [backendCoverPhoto,setBackendCoverPhoto]=useState( null)
    let [frontendImage,setFrontendImage]=useState( userData.image || profileP)
    let [frontendCoverPhoto,setFrontendCoverPhoto]=useState( userData.coverPhoto || coverP )
    let [errorMessage,setErrorMessage]=useState("")
    const image=useRef()
    const coverPhoto=useRef()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    const handleImage=(e)=>{
      const file=e.target.files[0];
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }
    const handleImageCover=(e)=>{
      const file=e.target.files[0];
      setBackendCoverPhoto(file)
      setFrontendCoverPhoto(URL.createObjectURL(file))
    }
    const handleSubmit= async (e)=>{
      e.preventDefault()
      setSaving(true)
       try {
                 const formData=new FormData()
                  formData.append("name",name)
                   formData.append("livesin",livesin)
                    formData.append("about",about)
          if(backendImage){
                    formData.append("image",backendImage)
                   }
          if(backendCoverPhoto){
                 formData.append("coverPhoto",backendCoverPhoto)
                  }
                  let result= await axios.post(`${serverUrl}/user/edit`,formData,
                    {withCredentials:true}
                  )
                  // console.log(result.data);
                  if(result?.data?.name){
                  dispatch(setUserData(result.data))
                  setSaving(false)
                  navigate('/')
                  }else{
                    setErrorMessage("plesee Uplaod Name")
                  setSaving(false)
                  }
                  
       } catch (error) {
           console.log(error);
        setSaving(false)
       }
      
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-indigo-500 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-3xl p-8">
        <div className="mb-6 flex items-center text-purple-600 gap-2 hover:underline cursor-pointer">
          <BiArrowBack size={24} />
          <span onClick={()=>navigate('/profile')}>Back to Profile</span>
        </div>

        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          ✨ Edit Your Profile
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter name"
              className="w-full px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Lives In
            </label>
            <input
              value={livesin}
              onChange={(e)=>setLivesin(e.target.value)}
              type="text"
              name="livesin"
              placeholder="Enter location"
              className="w-full px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-gray-700 font-semibold mb-2 block">
              About You
            </label>
            <textarea
              value={about}
              onChange={(e)=>setAbout(e.target.value)}
              type="text"
              name="about"
              rows="3"
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div >
            <label className="text-gray-700 font-semibold mb-2 block">
              Profile Image
            </label>
            <input
              //value={image}
              onChange={handleImage}
              
              type="file"
              ref={image}
              accept="image/*"
              hidden
              className="block w-full"
            />
            <img
              onClick={()=>image.current.click()} 
              src={frontendImage}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 rounded-full border-4 border-purple-400 object-cover shadow-lg"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Cover Image
            </label>
            <input
              //value={coverPhoto}
              onChange={handleImageCover}
              ref={coverPhoto}
              
              type="file"
              accept="image/*"
              className="block w-full"
              hidden
            />
            <img
              onClick={()=>coverPhoto.current.click()}
              src={frontendCoverPhoto}
              alt="Cover Preview"
              className="mt-2 w-full h-24 rounded-xl object-cover border-2 border-purple-300 shadow-md"
            />
          </div>
         {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
          <div className="md:col-span-2 text-center mt-4">
           
            {saving && <p className="text-blue-500 mb-2">Saving changes...</p>}
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg"
              disabled={saving}
            >
             { saving?"Saving...":"Save Changes"} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
