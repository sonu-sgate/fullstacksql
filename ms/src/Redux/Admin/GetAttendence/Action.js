import axios from "axios"
import { adminsideattenddatafail, adminsideattenddatareq, adminsideattenddatasucc } from "./ActionTypes"
import { api } from "../../Api/api"

export const adminsideattendatarequest=()=>{
    return {type:adminsideattenddatareq}
}

export const adminsideattenddatasuccess=(payload)=>{
    return {type:adminsideattenddatasucc,payload}
}
export const adminsideattenddatafailure=()=>{
    return {type:adminsideattenddatafail}
}
export const adminsideattendata=(id)=>(dispatch)=>{
    dispatch(adminsideattendatarequest())
    axios.get(`${api}/adminside/get/${id}`).then((res)=>{
        dispatch(adminsideattenddatasuccess(res.data))
    }).catch((err)=>{
        dispatch(adminsideattenddatafailure())
    })
}