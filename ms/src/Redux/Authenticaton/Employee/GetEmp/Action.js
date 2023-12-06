import axios from "axios"
import { getempsidefail, getempsidereq, getempsidesucc } from "./ActionTypes"
import { api } from "../../../Api/api"

export const getempsiderequest=()=>{
    return {type:getempsidereq}
}
export const getempsidesuccess=(payload)=>{
    return {type:getempsidesucc,payload}
}
export const getempsidefailure=()=>{
    return {type:getempsidefail}
}
export const getempside=(dispatch)=>{
    dispatch(getempsiderequest())
    axios.get(`${api}/empactivity/getdata`).then((res)=>{
        console.log('res',res)
        dispatch(getempsidesuccess(res.data))
    }).catch((err)=>{
        // console.log(err)
        dispatch(getempsidefailure())
    })
}