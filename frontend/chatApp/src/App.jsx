import React, { use } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
 import Signup from './pages/Signup.jsx'
import useCurrentUser from './customHooks/useCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/edit.jsx'
import useOthersUser from './customHooks/useOthersUser.jsx'

import { useState } from 'react'
import { useEffect } from 'react'
import {io} from 'socket.io-client'
import { useRef } from 'react'
import { serverUrl } from './main.jsx'

import { setSocket, setOnlineUsers } from './redux/user.slice.js'
import { useDispatch } from 'react-redux'


// Import the socket instance




function App() {
  
  let {userData,socket, onlineUsers}=useSelector((state)=>state.user)
  let [loading,setLoading]=useState(true)
  const socketRef =useRef();
  let dispatch=useDispatch();



useEffect(() => {
  if(userData){
  const socketio = io(`${serverUrl}`, {

    query: { userId: userData?._id || '' // Pass userId if available
    },
    transports: ['websocket'], // Use WebSocket transport
  });
  dispatch(setSocket(socketio));
 
  socketio.on("getOnlineUsers", (onlineUsers) => {
    // console.log("Online Users:", onlineUsers);
    dispatch(setOnlineUsers(onlineUsers));
  });
  return () => {
    socketio.close(); // Clean up on unmount
  };
  
  }
  else{
    if(socket) {
      socket.close(); // Close socket if userData is not available
      dispatch(setSocket(null));
    }

  }


  
}, [userData]);


  
   useCurrentUser();
   useOthersUser();
   
     useEffect(() => {
    // Short delay to let Redux finish
    const delay = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(delay);
  }, [userData]);

 


  if (loading) return <div className="text-center p-10">Loading...</div>;

  
  return (
   <Routes>
     <Route path='/login' element={!userData?<Login />:<Navigate to='/' />}/>
     <Route path='/signup' element={!userData?<Signup />:<Navigate to='/edit' />}/>
    <Route path='/' element={userData?<Home />:<Navigate to='/login' />}/>
    <Route path='/profile' element={userData?<Profile />:<Navigate to='/login' />}/>
    <Route path='/edit' element={<EditProfile />}/>

   </Routes>
  )
}

export default App
