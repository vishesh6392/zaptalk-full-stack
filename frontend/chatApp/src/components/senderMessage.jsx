import React from 'react'
import dp from '../assets/profile_photo.jpg'
import { useSelector } from 'react-redux'


function senderMessage({message, image}) {
  return (
    <div>
      <div class=" w-fit  max-w-[50%] bg-white p-3 rounded-xl shadow text-sm mr-auto ml-[10px]">
        {image &&
               <img src={image} alt='recever' className='w-[200px] h-[300cdpx] rounded-full border-2 border-white object-cover mr-2  '/>
        }
        {message? message.content : ''}
      

    </div>
    </div>
  )
}

export default senderMessage
