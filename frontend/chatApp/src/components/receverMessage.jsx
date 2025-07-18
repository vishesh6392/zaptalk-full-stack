import React from 'react'
import dp from '../assets/profile_photo.jpg'

function receverMessage({message, image}) {
  return (
    <div>
       <div class="self-end  w-fit max-w-[50%] bg-blue-500 text-white p-3 
       rounded-xl  shadow-gray-400 shadow-lg  text-sm  ml-auto mr-[10px]">
      {image &&
        <img src={image} alt='recever' className='w-[200px] h-[300cdpx] rounded-full border-2 border-white object-cover mr-2  '/>
      }
      {message? message.content : ''}
    
    </div>
    </div>
  )
}

export default receverMessage
