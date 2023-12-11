import axios from "axios"
import { getattendfail, getattendreq, getattendsucc } from "./ActionTypes"
import { api } from "../../../../Api/api"

export const getattendrequest=()=>{
    return {type:getattendreq}
}

export const getattendsuccuess=(payload)=>{
    return {type:getattendsucc,payload}
}
export const getattendfailure=()=>{
    return {type:getattendfail}
}
export const getattend=(dispatch)=>{
    dispatch(getattendrequest())
    axios.get(`${api}/empactivity/get`).then((res)=>{
        dispatch(getattendsuccuess(res.data))
    }).catch((err)=>{
        dispatch(getattendfailure())
    })
}