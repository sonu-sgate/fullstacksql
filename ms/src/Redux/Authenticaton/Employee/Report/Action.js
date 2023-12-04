import axios from "axios"
import { reportfail, reportreq, reportsucc } from "./ActionTypes"
import { api } from "../../../Api/api"

export const reportrequest=()=>{
    return {type:reportreq}
}
export const reportsuccess=()=>{
    return {type:reportsucc}
}
export const reportfailure=()=>{
    return {type:reportfail}
}
export const report=(obj)=>(dispatch)=>{
    dispatch(reportrequest())
    return axios.post(`${api}/empactivity/report`,obj)
}