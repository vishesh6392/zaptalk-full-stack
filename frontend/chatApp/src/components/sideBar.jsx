
import React from 'react';
import { useState } from 'react';
import { BiLogOutCircle, BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch} from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import { setOtherUserData, setSelectUser, setUserData } from '../redux/user.slice';





function SideBar() {

  const {userData,otherUserData,selectUser}=useSelector((state)=>state.user)
  let [Search,setSearch]=useState(false);
  
  const Dispatch=useDispatch()
  const Navigate=useNavigate()
  const handleLogogout = async() => {
     try {
         let result= await axios.get(`${serverUrl}/auth/logout`,{withCredentials:true});
         console.log(result);
         console.log("logout");
        Dispatch(setUserData(null))
        Dispatch(setOtherUserData(null))
        
        Navigate("/login")
        
     } catch (error) {
         console.log(error,"sideBar error")
     }
  }
  
  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-100 flex flex-col lg:block ${!selectUser?'block':'hidden'}`}>
      {/* Header section */}
        <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center
          shadow-gray-500 shadow-lg fixed bottom-[20px] left-[10px] bg-[#0ea5e9] cursor-pointer hover:bg-[#20c7ff]'
          onClick={handleLogogout}>
            <BiLogOutCircle className="w-[25px] h-[25]"/>
        </div>


      <div className="w-full h-[260px] bg-gradient-to-br from-[#20c7ff] to-[#0ea5e9] rounded-b-[40%] shadow-xl p-6">
        <div className="flex items-center gap-4 p-5">
          <a href='/profile'>
            <img
            src={userData.image?userData.image:"https://i.pravatar.cc/100"}
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-white shadow-gray-400 shadow-lg object-cover"
          />  
          </a>
          <div className="text-white">
            <h2 className="font-bold text-lg">{userData.name?userData.name:"John Doe"}</h2>
            <p className="text-sm text-white/80">Online</p>
          </div>
        </div>

        {/* Search bar */}
       <div className="w-full flex  items-center gap-[20px]">
           {!Search && <div className=' w-[60px] h-[60px]  rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg'onClick={()=>setSearch(true)}>
            <IoIosSearch className="w-[30px] h-[30px]"/></div>}
            
            {Search && <form className='w-[100%] h-[45px] bg-white shadow-gray-500 shadow-lg rounded-full flex items-center gap-[10px]  overflow-hidden px-[20px]'>
             <IoIosSearch className='w-[20px] h-[20px] cursor-pointer'/>
             <input className='rounded-lg w-full h-full p-[10px] bg-white outline-none' type='text' placeholder='search Users....'/>
             <RxCross2 className=' w-[20px] h-[20px] cursor-pointer hover:text-red-500' 
              onClick={()=>setSearch(false)}/>

            </form> }
            {otherUserData?.map((user) => (
            <div className='w-[60px] h-[60px] gap-[5px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg'onClick={()=>setSearch(true)}>
            <img src={user.image?user.image:"https://i.pravatar.cc/100"} alt={otherUserData.name} className="w-full h-full rounded-full boader-2 border-indigo-600 object-cover shadow-md"/></div>
             ))}
            
        </div>
    </div>

      {/* Online Users */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-gray-600 font-semibold mb-3">Online Users</h3>
        <div className="space-y-3">
          {otherUserData?.map((user) => (
            <div
              onClick={()=> Dispatch(setSelectUser(user))}
              className="flex items-center gap-4 bg-white p-3 rounded-xl shadow hover:bg-blue-100 cursor-pointer"
            >
              <img src={user.image?user.image:"https://i.pravatar.cc/100"} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{user.name?user.name:"John Doe"}</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




export default SideBar;


