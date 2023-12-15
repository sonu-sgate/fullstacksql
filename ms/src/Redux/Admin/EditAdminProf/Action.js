import { api } from "../../Api/api"
import { editadminfail, editadminreq, editadminsucc } from "./ActionTypes"
import axios from "axios"
export const editadminrequest=()=>{
    return {type:editadminreq}
}

export const editadminsuccess=(payload)=>{
    return {type:editadminsucc,payload}
}

export const editadminfailure=()=>{
    return {type:editadminfail}
}
export const editadmin=(id,obj)=>(dispatch)=>{
    // console.log(obj,id,"id,obj")
    dispatch(editadminrequest())
    return axios.patch(`${api}/adminside/editadmin/${id}`,obj)
}