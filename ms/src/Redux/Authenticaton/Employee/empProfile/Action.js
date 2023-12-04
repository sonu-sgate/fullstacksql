import axios from "axios"
import { empprofilefail, empprofilereq, empprofilesucc } from "./Actiontypes"
import { api } from "../../../Api/api"

export const empprofilerequest=()=>{
    return {type:empprofilereq}
}
export const empprofilesuccess=(payload)=>{
    return {type:empprofilesucc,payload}
}
export const empprofilefailure=()=>{
    return {type:empprofilefail}
}
export const empprofile=(dispatch)=>{
    dispatch(empprofilerequest())
    axios.get(`${api}/empactivity/profile`).then((res)=>{
        // console.log(res,"profileres")
        dispatch(empprofilesuccess(res.data))
    }).catch((err)=>{
        console.log(err)
        dispatch(empprofilefailure())
    })
}