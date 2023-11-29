import axios from "axios"
import { addcatfail, addcatreq, addcatsucc } from "./ActionTypes"
import { api } from "../../Api/api"

export const addcatrequest=()=>{
    return {type:addcatreq}
}
export const addcatsuccess=()=>{
    return {type:addcatsucc}
}
export const addcatfailure=()=>{
    return {type:addcatfail}
}
export const addcat=(obj)=>(dispatch)=>{
dispatch(addcatrequest())
return axios.post(`${api}/adminside/addcat`,obj)
}