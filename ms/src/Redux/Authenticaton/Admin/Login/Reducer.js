import { adminloginfail, adminloginreq, adminloginsucc } from "./ActionTypes"

const initialdata={
    adminlogisLoading:false,
    adminlogisError:false
}
export const adminloginreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case adminloginreq:{
            return {...state,adminlogisLoading:true,adminlogisError:false}
        }
        case adminloginsucc:{
            return {...state,adminlogisLoading:false,adminlogisError:false}
        }
        case adminloginfail:{
            return {...state,adminlogisLoading:false,adminlogisError:true}
        }
        default:{
            return state
        }
    }
}