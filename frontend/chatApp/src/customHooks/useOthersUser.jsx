import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main.jsx"
import { setOtherUserData, setUserData } from "../redux/user.slice.js"
import { useDispatch, useSelector } from "react-redux"
const useOthersUser= ()=>{
    let dispatch=useDispatch();
    let {userData}=useSelector((state)=>state.user)
    // console.log("userData",userData);
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                let result=await axios.get(`${serverUrl}/user/others`
                    ,{withCredentials:true}
                )
                dispatch(setOtherUserData(result.data))
            } catch (error) {
                console.log("ye error hai",error)
            }
        }
        fetchUser();
    
    },[dispatch])
}
export default useOthersUser;