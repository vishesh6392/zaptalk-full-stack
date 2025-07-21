import { createSlice } from "@reduxjs/toolkit";
//import { setMessages } from "./message.slice";



const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUserData:null,
        selectUser:null,
        socket:null,
        onlineUsers:null,
        searchData:null,
    },
    reducers:{
        setSelectUser:(state,action)=>{
            state.selectUser=action.payload
        },
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        setOtherUserData:(state,action)=>{
            state.otherUserData=action.payload
        },
        setSocket:(state,action)=>{
            state.socket=action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        },
        setSearchData:(state,action)=>{
            state.searchData=action.payload
        },

        
    }
})

export const {setUserData,setOtherUserData,setSelectUser,setMessages,setSocket,setOnlineUsers,setSearchData}=userSlice.actions;
export default userSlice.reducer;