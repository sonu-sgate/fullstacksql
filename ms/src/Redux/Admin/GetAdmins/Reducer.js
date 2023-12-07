import { getadmindatafail, getadmindatareq, getadmindatasucc } from "./ActionTypes"

const initialdata={
    getadmindataisLoading:false,
    getadmindataisError:false,
    admindata:[]
}
export const getadmindatareducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case getadmindatareq:{
            return {...state,getadmindataisLoading:true,getadmindataisError:false,admindata:[]}
        }
        case getadmindatasucc:{
            return {...state,getadmindataisLoading:false,getadmindataisError:false,admindata:payload.msg,totalpages:payload.totalpages}
        }
        case getadmindatafail:{
            return {...state,getadmindataisLoading:false,getadmindataisError:true,admindata:[]}
        }
        default:{
            return state
        }
    }
}