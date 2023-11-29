import { api } from "../../../Api/api"
import { adminloginfail, adminloginreq, adminloginsucc } from "./ActionTypes"

export const adminloginrequest=()=>{
    return {type:adminloginreq}
}
export const adminloginsuccess=()=>{
    return {type:adminloginsucc}
}
export const adminloginfailure=()=>{
    return {type:adminloginfail}
}
export const adminlogin=(obj)=>(dispatch)=>{
    return axios.post(`${api}/auth/adminlogin`,obj)
}