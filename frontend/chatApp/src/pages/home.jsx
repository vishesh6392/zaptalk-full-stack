import React from 'react'
import Sidebar from '../components/sideBar.jsx'
import Messagearea from '../components/messageArea.jsx'
//import getMessages from '../customHooks/useGetMessages.jsx'
import useGetMessages from '../customHooks/useGetMessages.jsx';






function home() {

  useGetMessages()
  // console.log(useGetMessages())
  return (
    <div className='flex w-full h-[100vh]'>
    <Sidebar/>
    <Messagearea/>
    </div>
  )
}

export default home
