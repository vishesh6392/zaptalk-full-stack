import React from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/profile_photo.jpg'

function receverMessage({message, image}) {
  const {userData} = useSelector((state) => state.user);
  return (

     <div className= ' flex'>

      

      
       <div class="self-end  w-fit max-w-[50%] bg-blue-500 text-white p-3 
       rounded-xl  shadow-gray-400 shadow-lg  text-sm  ml-auto mr-[3px]">
        

      {image &&
        <img src={image} alt='recever' className='w-[200px] h-[300cdpx] rounded-full border-2 border-white object-cover mr-2  '/>
      }
      {message? message.content : ''}
  
    </div>
     
       <div class="flex  justify-end items-end ">
              <img src={userData.image?userData.image:"https://i.pravatar.cc/100"} alt="Sender" className='w-[40px] h-[40px] rounded-full border-2 border-white object-cover mr-2 ' />

       </div>
    </div>
  ) 
}

export default receverMessage
