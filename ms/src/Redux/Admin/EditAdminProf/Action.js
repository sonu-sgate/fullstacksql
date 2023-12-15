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
    dispatch(editadminrequest())
    axios.patch(`${api}/adminside/${id}`,obj).then((res)=>{
        dispatch(editadminsuccess(res.data))
    }).catch((err)=>{
        dispatch(editadminfailure())
    })
}