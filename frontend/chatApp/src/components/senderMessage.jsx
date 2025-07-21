import React from 'react'
import dp from '../assets/profile_photo.jpg'
import { useSelector } from 'react-redux'
import { BiLogOutCircle } from 'react-icons/bi'


function senderMessage({message, image}) {
  
   let userData=useSelector((state)=>state.user.selectUser)
  return (
    <div className='w-full h-fit flex justify-end  mt-2 '> 
       <img src={userData.image?userData.image:"https://i.pravatar.cc/100"} alt="Sender" className='w-[40px] h-[40px] rounded-full border-2 border-white object-cover mr-2 ' />
      {/* Message Box */}
       
      <div class=" w-fit  max-w-[50%] bg-white p-3 rounded-xl shadow text-sm mr-auto ml-[2px]">
        
         <div className='w-full h-fit flex justify-end items-center mt-2'  >
      
        {image &&
               <img src={image} alt='recever' className='w-[200px] h-[300cdpx] rounded-full border-2 border-white object-cover mr-2  '/>
        }
        {message? message.content : ''}
      

    </div>
    </div>
    </div>
  )
}

export default senderMessage
