import axios from "axios"
import { getempfail, getemplreq, getempsucc } from "./ActionTypes"
import { api } from "../../../Api/api"

export const getemprequest=()=>{
    return {type:getemplreq}
}

export const getempsuccess=(payload)=>{
    return {type:getempsucc,payload}
}

export const getempfailure=()=>{
    return {type:getempfail}
}
export const getemp=(dispatch)=>{
    dispatch(getemprequest())
    axios.get(`${api}/adminside/getemp`).then((res)=>{
        console.log(res)
    dispatch(getempsuccess(res.data))
    }).catch((err)=>{
        dispatch(getempfailure())
    })
}
