import axios from "axios"
import { adminsignupfail, adminsignupreq, adminsignupsucc } from "./ActionTypes"
import { api } from "../../../Api/api"

export const adminsignuprequest=()=>{
    return {type:adminsignupreq}
}
export const adminsignupsuccess=()=>{
    return {type:adminsignupsucc}
}
export const adminsignupfailure=()=>{
    return {type:adminsignupfail}
}
export const adminsignup=(obj)=>(dispatch)=>{
    dispatch(adminsignuprequest())
    return axios.post(`${api}/auth/adminsignup`,obj)
}