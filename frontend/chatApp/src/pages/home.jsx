import React from 'react'
import Sidebar from '../components/sideBar.jsx'
import Messagearea from '../components/messageArea.jsx'






function home() {
  return (
    <div className='flex w-full h-[100vh]'>
    <Sidebar/>
    <Messagearea/>
    </div>
  )
}

export default home
