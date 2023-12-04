import { emploginfail, emploginreq, emploginsucc } from "./ActionTypes"

const initialdata={
    emplogisLoading:false,
    emplogisError:false,
    profile:[]
}
export const emploginreducer=(state=initialdata,action)=>{
    const {type,payload}=action

    switch(type){
        case emploginreq:{
            return {...state,emplogisLoading:true,emplogisError:false,profile:[]}
        }
        case emploginsucc:{
            return {...state,emplogisLoading:false,emplogisError:false,profile:payload.empdetails}
        }
        case emploginfail:{
            return {...state,emplogisLoading:false,emplogisError:true,profile:[]}
        }
        default:{
            return state
        }
    }
}