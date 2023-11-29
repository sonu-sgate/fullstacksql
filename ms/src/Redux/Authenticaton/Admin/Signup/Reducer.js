import { adminsignupfail, adminsignupreq, adminsignupsucc } from "./ActionTypes"

const initialdata={
    adminsignupisLoading:false,
    adminsignupisError:false
}

export const adminsignupreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case adminsignupreq:{
            return {...state,adminsignupisLoading:true,adminsignupisError:false}
        }
        case adminsignupsucc:{
            return {...state,adminsignupisLoading:false ,adminsignupisError:false}
        }
        case adminsignupfail:{
            return {...state,adminsignupisLoading:false,adminsignupisError:true}
        }
        default:{
            return state
        }
    }
}