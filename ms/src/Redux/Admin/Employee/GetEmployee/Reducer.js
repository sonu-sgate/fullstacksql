import { getempfail, getemplreq, getempsucc } from "./ActionTypes"

const initialdata={
    getempisLoading:false,
    getempisError:false,
    result:[]
}

export const getempreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case getemplreq:{
            return {...state,getempisLoading:true,getempisError:false,result:[]}
        }
        case getempsucc:{
            return {...state,getempisLoading:false,getempisError:false,result:payload.msg}
        }
        case getempfail:{
            return {...state,getempisLoading:false,getempisError:true,result:payload.msg}
        }
        default:{
            return state
        }
    }
}