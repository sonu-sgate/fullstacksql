import axios from "axios"
import { usersignoutfail, usersignoutreq, usersignoutsucc } from "./ActionTypes"
import { api } from "../../../../Api/api"

export const usersignoutrequest=()=>{
    return {type:usersignoutreq}
}

export const usersignoutsuccess=()=>{
    return {type:usersignoutsucc}
}
export const usersignoutfailure=()=>{
    return {type:usersignoutfail}
}
export const usersignout=(obj)=>(dispatch)=>{
dispatch(usersignoutrequest())
return axios.post(`${api}/empactivity/signOut/${id}`,obj)
}