import axios from "axios"
import { addempfail, addempreq, addempsucc } from "./ActionTypes"
import { api } from "../../../Api/api"

export const addemprequest=()=>{
    return {type:addempreq}
}
export const addempsuccess=()=>{
    return {type:addempsucc}
}
export const addempfailure=()=>{
    return {type:addempfail}
}
export const addemp=(obj)=>{
    return axios.post(`${api}/adminside/addemployee`,obj)
}