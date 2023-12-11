import { usersignoutfail, usersignoutreq, usersignoutsucc } from "./ActionTypes"

const initialdata={
    usersignoutisLoading:false,
    usersignoutisError:false
}
export const usersignoutreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case usersignoutreq:{
            return {...state,usersignoutisLoading:true,usersignoutisError:false}
        }
        case usersignoutsucc:{
            return {...state,usersignoutisLoading:false,usersignoutisError:false}
        }
        case usersignoutfail:{
            return {...state,usersignoutisError:true,usersignoutisLoading:false}
        }
        default:{
            return state
        }
    }
}