import { reportfail, reportreq, reportsucc } from "./ActionTypes"

const initialdata={
    reportisLoading:false,
    reprotisError:false
}
export const reportreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case reportreq:{
            return {...state,reportisLoading:true,reprotisError:false}
        }
        case reportsucc:{
            return {...state,reportisLoading:false,reprotisError:false}
        }
        case reportfail:{
            return {...state,reportisLoading:false,reprotisError:true}
        }
        default:{
            return state
        }
    }
}