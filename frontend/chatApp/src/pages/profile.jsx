import React from "react";
import profileP from "../assets/profile_photo.jpg"
import coverP from "../assets/cover_photo.jpg"
//import { BiSolidEditLocation } from "react-icons/bi";
import { BiSolidEdit } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

 

const ProfilePage = () => {
   const {userData}=useSelector((state)=>state.user)
  const user = {
    name: userData.name,
    bio: userData.about?userData.about:"Building the future with code 🧑‍💻",
    location: userData.livesin? userData.livesin:"San Francisco, CA",
    email: userData.email?userData.email:"john.doe@example.com",
    coverPhoto: userData.coverPhoto?userData.coverPhoto: coverP,
    profilePhoto: userData.image?userData.image:profileP,
    friends: userData.friends.length,
    posts: userData.posts.length,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-400 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
      {/* Cover Photo */}
      <div className="relative">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full h-64 object-cover"
        />
        {/* Profile Image */}
        <div className="absolute left-6 -bottom-16">
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-20 px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 italic">{user.bio}</p>
            <p className="text-sm text-gray-600 mt-2">
              📍 {user.location} &nbsp; | &nbsp; 📧 {user.email}
            </p>
          </div>

          <div className="flex gap-6 mt-4 sm:mt-0">
            <div className="text-center">
              <div className="text-xl font-semibold mb-2"><Link to='/edit'><BiSolidEdit /></Link></div>
              <button className="text-sm text-gray-500 ">EditProfile</button>
            </div>

            <div className="text-center">
              <div className="text-xl font-semibold">{user.friends}</div>
              <div className="text-sm text-gray-500">Friends</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">{user.posts}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default ProfilePage;
