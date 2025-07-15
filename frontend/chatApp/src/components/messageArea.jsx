import React from 'react'
import { MdOutlineArrowBack } from "react-icons/md";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { setSelectUser } from '../redux/user.slice';
import { useDispatch } from 'react-redux';



function MessageArea() {
       let {selectUser}=useSelector((state)=>state.user)
       const dispatch=useDispatch()
  return (
    <div className={`lg:w-[70%] w-full h-full  ${selectUser?'block':'hidden'} lg:flex flex-col  from-blue-200 to-indigo-400`}>
      {/* <!-- Container --> */}
      {selectUser && <div class="flex flex-col h-full w-full bg-white  overflow-hidden shadow-lg">

  {/* <!-- Header --> */}
  <div class="bg-gradient-to-br from-[#20c7ff] to-[#0ea5e9] px-5 py-4 flex items-center gap-4 shadow rounded-b-[20%] w-full h-[100px]">
    <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center
          shadow-gray-500 shadow-lg cursor-pointer hover:bg-[#20c7ff]' onClick={(e)=>dispatch(setSelectUser(null))}>
        < MdOutlineArrowBack size={24} color="white curser-pointer" />
    </div>
    
    <img src={selectUser?.image?selectUser.image:"https://i.pravatar.cc/100"} alt="User" class="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md" />
    <div class="text-white">
      <h2 class="text-lg font-semibold">{selectUser?.name?selectUser.name:"John Doe"}</h2>
      <p class="text-sm text-white/70">Online</p>
    </div>
  </div>

  {/* <!-- Messages Area --> */}
  <div class="flex-auto px-4 py-3 overflow-y-auto space-y-3 bg-gray-50">
    <div class="  max-w-[50%] bg-white p-3 rounded-xl shadow text-sm mr-auto ml-[10px]">
      Hello! How are you?
    </div>
    <div class="self-end  max-w-[50%] bg-blue-500 text-white p-3 rounded-xl shadow text-sm  ml-auto mr-[10px]">
      I’m good, thanks! What about you?
    </div>
  </div>

  {/* <!-- Input Section --> */}
  <form class="flex items-center gap-3 p-4 border-t bg-white">
    <i class="text-xl text-gray-500 cursor-pointer">😊</i>
    <input type="text" placeholder="Type a message..." class="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm" />
    <button type="submit" class="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
      <i class="text-xl">➤</i>
    </button>
  </form>

         </div>}
      {!selectUser && <div className='relative'>
           <div class="flex flex-col items-center justify-center h-full text-center text-gray-600 ">
    <img src="https://undraw.io/api/illustrations/95d2f34b-f77c-4a23-948e-1936f56ffb65" alt="Communication Illustration" class="w-52 h-52 " />


  <h2 class="text-6xl font-bold text-blue-600 mb-2">
    Welcome to <span class="text-pink-500">ZapTalk
</span> 🎉
  </h2>

  <p class="text-2xl text-gray-500 max-w-md mb-4">
    The smoothest way to stay connected. Start a conversation and share good vibes in real-time.
  </p>

  <p class="text-xl text-gray-400 italic">
    Made with 💙 for people who love to talk.
  </p>
                </div>



        </div>}

    </div>
  )
}

export default MessageArea

