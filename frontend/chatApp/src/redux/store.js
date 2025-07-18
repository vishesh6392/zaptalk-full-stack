import {configureStore} from "@reduxjs/toolkit";
 import userSlice from "./user.slice.js";
import messageSlice from "./message.slice.js";

 const store=configureStore({
       reducer:{
        user:userSlice,
        message:messageSlice,
       }
})

 export default store;