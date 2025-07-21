import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/user.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



 




function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    let [password, setPassword] = React.useState('');
    let [username, setUsername] = React.useState('');
    let [email, setEmail] = React.useState('');
    let [error,setError]=React.useState();
    let [loading,setLoding]=React.useState(false);
     const Dispatch=useDispatch();
      const navigate=useNavigate();


    





  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };



         const handleSignUp= async (e) =>{
                     e.preventDefault();
                     setLoding(true);
                     
                 try{
                        let result=await axios.post(`${serverUrl}/auth/signup`,{
                         username,
                         password,
                         email,
                     },{withCredentials:true})
                     Dispatch(setUserData(result.data))
                      navigate('/edit')
                       setEmail("")
                       setUsername("")
                       setPassword("")
                     
                      setLoding(false);
                    //  console.log(data);
                    }
                catch(err){
                console.log(err);
                setLoding(false);
                setError(err.response?.data?.message);
                     }
             }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-400 p-4">
      <div className="backdrop-blur-md bg-white/30 rounded-3xl shadow-2xl p-10   max-w-xl flex flex-col md:flex-row gap-10">

    
        <div className="flex-1">
            <div class=""></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sign Up</h2>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <input type="text" placeholder="Full Name" className="w-full px-5 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-inner focus:outline-none" 
              onChange={(e)=>setUsername(e.target.value)}  />
            <input type="email" placeholder="Email Address" className="w-full px-5 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-inner focus:outline-none" 
              onChange={(e)=>setEmail(e.target.value)} />
              <div className="relative ">
                <input
               onChange={(e)=>setPassword(e.target.value)}
               type={showPassword ? 'text' : 'password'}
             className="w-full px-5 py-3 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-inner focus:outline-none"
              placeholder="Enter your password"
             />
                 <span
                    onClick={togglePassword}
                     className="absolute right-3 top-2.5 cursor-pointer text-gray-600 mt-1.5 mr-2">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            
                
             <div className="flex-1 flex flex-col items-center justify-center mt-6">
                {error && <p className='text-red-500 text-center mt-2 mb-2'>{error}</p>}
                <button type='submit' className="w-full bg-black text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition">
                    {loading?'Loading...':'Sign Up'}</button>

                <p className="mt-4 text-sm text-gray-700 cursor-pointer hover:underline"  >
                            Already have an account? <a href="/login" className="text-black font-medium hover:underline">Log in</a>
                </p>

               
           </div>    
          </form>


          

        </div>

    

      </div>
    </div>
  );
}

export default Signup;






// //   <div className="my-4 text-gray-500">Or</div> */}

//                         {/* <button className="flex items-center justify-center gap-3 w-full border border-gray-400 py-2 rounded-full bg-white hover:bg-gray-50 transition">
//                              <FcGoogle className="text-xl" /> Sign up with Google
//                                  </button> */}

//                     {/* <button className="flex items-center justify-center gap-3 w-full border border-gray-400 py-2 rounded-full bg-white mt-3 hover:bg-gray-50 transition">
//                          <FaFacebookF className="text-blue-600 text-lg" /> Sign up with Facebook
//                          </button>