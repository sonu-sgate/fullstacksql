import axios from "axios"
import { emploginfail, emploginreq, emploginsucc } from "./ActionTypes"
import { api } from "../../../Api/api"

export const emploginrequest=()=>{
    return {type:emploginreq}
}

export const emploginsuccess=(payload)=>{
return {type:emploginsucc,payload}
}

export const emploginfailure=()=>{
    return {type:emploginfail}
}
export const emplogin=(obj)=>(dispatch)=>{
    // console.log("empside",obj)
    dispatch(emploginrequest())
    return axios.post(`${api}/empside/login`,obj)
}