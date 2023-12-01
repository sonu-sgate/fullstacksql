import axios from "axios"
import { getsinglefail, getsinglereq, getsinglesucc } from "./ActionTypes"
import { api } from "../../../Api/api"

export const getsingleemprequest=()=>{
    return {type:getsinglereq}
}
export const getsingleempsuccess=(payload)=>{
    return {type:getsinglesucc,payload}
}
export const getsingleempfailure=()=>{
    return {type:getsinglefail}
}
export const getsingleemp=(id)=>(dispatch)=>{
    dispatch(getsingleemprequest())
    console.log(id,"frontend")
    axios.get(`${api}/adminside/getsingleemp/${id}`).then((res)=>{
        dispatch(getsingleempsuccess(res.data))
    }).catch((err)=>{
        dispatch(getsingleempfailure())
    })
}