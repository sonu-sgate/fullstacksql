import axios from "axios"
import { getcatfail, getcatreq, getcatsucc } from "./ActionTypes"
import { api } from "../../Api/api"

export const getcatrequest=()=>{
    return {type:getcatreq}
}
export const getcatsuccess=(payload)=>{
    return {type:getcatsucc,payload}
}
export const getcatfailure=()=>{
    return {type:getcatfail}
}
export const getcat=(dispatch)=>{
    dispatch(getcatrequest())
    axios.get(`${api}/adminside/getcat`).then((res)=>{
        dispatch(getcatsuccess())
    }).catch((err)=>{
        dispatch(getcatfailure())
    })
}