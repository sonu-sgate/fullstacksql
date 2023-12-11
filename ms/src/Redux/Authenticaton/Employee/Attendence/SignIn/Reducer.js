import { usersigninfail, usersinginreq, usersinginsucc } from "./ActionTypes"

const initialdata={
    usersigninisLoading:false,
    usersigninisError:false
}
export const usersigninreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case usersinginreq:{
            return {...state,usersigninisLoading:true,usersigninisError:false}
        }
        case usersinginsucc:{
            return {...state,usersigninisLoading:false,usersigninisError:false}
        }
        case usersigninfail:{
            return {...state,usersigninisLoading:false,usersigninisError:true}
        }
        default:{
            return state
        }
    }
}