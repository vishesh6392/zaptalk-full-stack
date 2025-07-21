import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineArrowBack } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectUser } from '../redux/user.slice';
import { BsEmojiSunglasses } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './senderMessage';
import ReceverMessage from './receverMessage';
import { FaMicrophone } from 'react-icons/fa'; 
import recording from './recording';
import axios from 'axios';
import { serverUrl } from '../main';
import { setMessages } from '../redux/message.slice';
import useGetMessages from '../customHooks/useGetMessages'
import { useContext } from 'react';
import { SocketContext } from '../App'; // Adjust the path as necessary




function MessageArea() {

  useGetMessages();
  
  const  selectUser  = useSelector((state) => state.user.selectUser);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const imageRef = useRef();
  const scrollRef = useRef(null);
 
  
 // let [messages, setMessages] = useState([]);
  const messages= useSelector((state) => state.message.messages);


   useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  console.log("Messages in MessageArea:", messages);
   console.log("Selected User in MessageArea:", selectUser);

  const handleEmojiClick = (emoji) => {
    setInputValue(prev => prev + emoji.emoji);
  };

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const MessageDataHamder = async(e) => {
    e.preventDefault();
    if (!inputValue.trim() && !backendImage) {
      return;
    }
    const formData = new FormData();
    formData.append("content", inputValue);
    if (backendImage) {
      formData.append("image", backendImage);
    } 
    console.log("Sending message with data:", formData);
    
  
    let recieverId = selectUser._id;
    console.log("Sending message to user:", selectUser._id);
    if (!selectUser) {
      console.error("No user selected for sending message");
      return; 
    } 
    const result= await axios.post(`${serverUrl}/message/send/${recieverId}`, formData, {
      withCredentials: true,
     headers: {
      "Content-Type": "multipart/form-data",
        } }
    );
      console.log(result.data);
    dispatch(setMessages( [...messages, result.data]));
    setInputValue("");
    setFrontendImage(null);
    setBackendImage(null);

  }
  return (
    <>
    
    <div className={`lg:w-[70%] w-full h-full ${selectUser ? 'block' : 'hidden'} lg:flex flex-col from-blue-200 to-indigo-400`}>
      {/* Container */}
      {selectUser ? (
        <>
          <div className="flex flex-col h-full w-full bg-white overflow-hidden shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#20c7ff] to-[#0ea5e9] px-5 py-4 flex items-center gap-4 shadow rounded-b-[20%] w-full h-[100px]">
              <div
                className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer hover:bg-[#20c7ff]"
                onClick={() => dispatch(setSelectUser(null))}
              >
                <MdOutlineArrowBack size={24} color="white" />
              </div>
              <img
                src={selectUser?.image ? selectUser.image : "https://i.pravatar.cc/100"}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
              />
              <div className="text-white">
                <h2 className="text-lg font-semibold">{selectUser?.name ? selectUser.name : "John Doe"}</h2>
                <p className="text-sm text-white/70">Online</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
            ref={scrollRef}
            className="flex-auto px-4 py-3 overflow-y-auto space-y-3 bg-gray-50">
              
            
              {messages.map((mess,index)=>{
              if (mess.sender!= selectUser._id) {
                return (
                  <ReceverMessage key={index} message={mess} image={mess.image} />
                );
              } else {
                return (
                  <SenderMessage key={index} message={mess} image={mess.image} />
                );
              }
            
                
              })}
            </div>


            {/* Input Section */}
            <div className="ml-[10%] shadow-lg rounded-lg">
              {showPicker && (
                <div className="absolute bottom-[10%]">
                  <EmojiPicker width={250} height={350} onEmojiClick={handleEmojiClick} />
                </div>
              )}
              {frontendImage && (
                  <img src={frontendImage} alt="Selected" className=" absolute bottom-[12%] w-[150px] h-[250px] rounded-xl border-2  object-cover mr-2 " />
              
              )}
            </div>
            <form  onSubmit={MessageDataHamder} className="flex items-center gap-3 p-4 border-t bg-white">
              <i className="text-xl text-gray-500 cursor-pointer" onClick={() => setShowPicker(prev => !prev)}>
                <BsEmojiSunglasses className="overflow-hidden cursor-pointer" />
              </i>
              <i className="text-xl text-gray-500 cursor-pointer" onClick={() => imageRef.current.click()}>
                <RiImageAddFill className="overflow-hidden cursor-pointer" />
              </i>
              <i className="text-xl text-gray-500 cursor-pointer">
                <FaMicrophone className="overflow-hidden cursor-pointer" />
              </i>
              <input
                onChange={handleInputImage}
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                ref={imageRef}
              />
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setShowPicker(false)}
              />
              <button 
               
               type='submit'
               className="bg-blue-500 p-2 w-[50px] h-[50px] rounded-full text-white hover:bg-blue-600">
                <i className="text-xl">➤</i>
              </button>
            </form>
          
             
          
          </div>
        </>
      ) : (
        <div className="relative">
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
            <img
              src="https://undraw.io/api/illustrations/95d2f34b-f77c-4a23-948e-1936f56ffb65"
              alt="Communication Illustration"
              className="w-52 h-52"
            />
            <h2 className="text-6xl font-bold text-blue-600 mb-2">
              Welcome to <span className="text-pink-500">ZapTalk</span> 🎉
            </h2>
            <p className="text-2xl text-gray-500 max-w-md mb-4">
              The smoothest way to stay connected. Start a conversation and share good vibes in real-time.
            </p>
            <p className="text-xl text-gray-400 italic">
              Made with 💙 for people who love to talk.
            </p>
          </div>
        </div>
      )}
    
          
    </div>
    </>
  );
}

export default MessageArea;

