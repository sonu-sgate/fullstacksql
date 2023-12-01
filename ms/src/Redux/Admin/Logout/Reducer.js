import { adminlogoutfail, adminlogoutreq, adminlogoutsucc } from "./ActionTypes"

const initialdata={
    logoutisLoading:false,
    logoutisError:false
}
export const amdinlogoutreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case adminlogoutreq:{
            return {...state,logoutisError:false,logoutisLoading:true}
        }
        case adminlogoutsucc:{
            return {...state,logoutisError:false,logoutisLoading:true}
        }
        case adminlogoutfail:{
            return {...state,logoutisError:true,logoutisLoading:false}
        }
        default:{
            return state
        }
    }
}