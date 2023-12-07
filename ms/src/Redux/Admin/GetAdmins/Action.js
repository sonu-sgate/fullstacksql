import axios from "axios"
import { getadmindatareq, getadmindatafail, getadmindatasucc } from "./ActionTypes"
import { api } from "../../Api/api"

export const getadmindatarequest=()=>{
    return {type:getadmindatareq}
}
export const getadmindatasuccess=(payload)=>{
    return {type:getadmindatasucc,payload}
}
export const getadmindatafailure=()=>{
    return {type:getadmindatafail}
}
export const getadmindata=(obj)=>(dispatch)=>{
dispatch(getadmindatarequest())
const {limit,page}=obj
if(!limit){obj.limit=10}
if(!page){obj.page=1}
console.log(obj,"[arma")
axios.get(`${api}/adminside/admins`,{
    params:obj,
 
}).then((res)=>{
    dispatch(getadmindatasuccess(res.data))
}).catch((err)=>{
    dispatch(getadmindatafailure())
})
}