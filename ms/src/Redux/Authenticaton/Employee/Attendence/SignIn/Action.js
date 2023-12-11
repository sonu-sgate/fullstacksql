import axios from "axios"
import { usersigninfail, usersinginreq, usersinginsucc } from "./ActionTypes"
import { api } from "../../../../Api/api"

export const usersigninrequest=()=>{
    return {type:usersinginreq}
}
export const usersigninsuccess=()=>{
    return {type:usersinginsucc}
}
export const usersinginfailure=()=>{
    return {type:usersigninfail}
}

export const usersignin=(obj)=>(dispatch)=>{
    dispatch(usersigninrequest())
    axios.post(`${api}/empactivity/signIn`,obj)
}