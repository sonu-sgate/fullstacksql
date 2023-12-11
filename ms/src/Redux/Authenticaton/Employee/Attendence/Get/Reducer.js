import { getattendfail, getattendreq, getattendsucc } from "./ActionTypes"

const initialdata={
    getattendisLoading:false,
    getattendisError:false,
    data:[]
}
export const getattendreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case getattendreq:{
            return {...state,getattendisLoading:true,getattendisError:false,data:[]}
        }
        case getattendsucc:{
            return {...state,getattendisLoading:false,getattendisError:false,data:payload.msg}
        }
        case getattendfail:{
            return {...state,getattendisLoading:false,getattendisError:true,data:[]}
        }
        default:{
            return state
        }
    }
}