import React from 'react'
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









function signup() {
  
  let {userData}=useSelector((state)=>state.user)
  let [loading,setLoading]=useState(true)
  console.log(userData);
  
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

export default signup
