import axios from "axios"
import { getcountfail, getcountreq, getcountsucc } from "./ActionTypes"
import { api } from "../../Api/api"

export const getcountrequest=()=>{
    return {type:getcountreq}
}

export const getcountsuccess=(payload)=>{
    return {type:getcountsucc,payload}
}
export const getcountfailure=()=>{
    return {type:getcountfail}
}
export const getcount=(dispatch)=>{
dispatch(getcountrequest())
axios.get(`${api}/adminside/getcount`).then((res)=>{
    console.log(res)
    dispatch(getcountsuccess(res.data))
}).catch((err)=>{
    dispatch(getcountfailure())
})
}