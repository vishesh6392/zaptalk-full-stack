import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main.jsx";
import { useDispatch, useSelector } from "react-redux";

import {setMessages }from "../redux/message.slice.js";

import { setUserData } from "../redux/user.slice.js";   
const useGetMessages = () => {
  const dispatch = useDispatch();
  const { userData, selectUser } = useSelector((state) => state.user);
    console.log("User Data in useGetMessages:", userData);
    console.log("Selected User Data in useGetMessages:", selectUser);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
          console.log("Fetching messages for user:", selectUser._id);
        if (!selectUser?._id) {
          console.error("No user selected for fetching messages");
          return;
        }
        const result = await axios.get(
          `${serverUrl}/message/get/${selectUser._id}`,
          { withCredentials: true }
        );
        console.log("Fetched messages:", result.data);
        dispatch(setMessages(result.data));
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    if (selectUser?._id) {
      fetchMessages();
    }
  }, [selectUser]);
};

export default useGetMessages;
