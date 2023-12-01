import axios from "axios"
import { adminloginreq } from "../../Authenticaton/Admin/Login/ActionTypes"
import { adminlogoutfail, adminlogoutreq, adminlogoutsucc } from "./ActionTypes"
import { api } from "../../Api/api"

export const adminlogoutrequest=()=>{
    return {type:adminloginreq}
}
export const adminlogoutsuccess=()=>{
    return {type:adminlogoutsucc}
}
export const adminlogoutfailure=()=>{
    return {type:adminlogoutfail}
}
export const adminlogout=(dispatch)=>{
dispatch(adminlogoutrequest())
return axios.get(`${api}/adminside/adminlogout`)
}