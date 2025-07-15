import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main.jsx"
import { setUserData } from "../redux/user.slice.js"
import { useDispatch, useSelector } from "react-redux"
const useCurrentUser= ()=>{
    let dispatch=useDispatch();
    let {userData}=useSelector((state)=>state.user)
    // console.log("userData",userData);
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                let result=await axios.get(`${serverUrl}/user/current`
                    ,{withCredentials:true}
                )
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log("ye error hai",error)
            }
        }
        fetchUser();
    
    },[dispatch])
}
export default useCurrentUser;