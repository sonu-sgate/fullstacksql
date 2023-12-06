import { getempsidefail, getempsidereq, getempsidesucc } from "./ActionTypes"

const initialdata={
    getempsideisLoading:false,
    getempsideisError:false,
    data:[]
}
export const getempsidereducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case getempsidereq:{
            return {...state,getempsideisLoading:true,getempsideisError:false,data:[]}
        }
        case getempsidesucc:{
            // console.log(payload.msg,'datapayload')
            return {...state,getempsideisLoading:false,getempsideisError:false,data:payload.msg}
        }
        case getempsidefail:{
            return {...state,getempsideisLoading:false,getempsideisError:true,data:[]}
        }
        default:{
            return state
        }
    }
}