import { createSlice } from "@reduxjs/toolkit";
//import { setMessages } from "./message.slice";



const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUserData:null,
        selectUser:null,
    
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
        
    }
})

export const {setUserData,setOtherUserData,setSelectUser,setMessages}=userSlice.actions;
export default userSlice.reducer;