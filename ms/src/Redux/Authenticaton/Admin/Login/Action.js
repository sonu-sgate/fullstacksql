import { api } from "../../../Api/api"
import { adminloginfail, adminloginreq, adminloginsucc } from "./ActionTypes"
import axios from 'axios'
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
    // console.log(obj)
    let {location}=obj
    console.log(location,"actionlocation")
    dispatch(adminloginrequest())
    if(location=="/adminlogin"){
    return axios.post(`${api}/adminauth/adminlogin`,obj)}
   if(location=="/employlogin"){
        return axios.post(`${api}/empside/login`,obj)
    }
}