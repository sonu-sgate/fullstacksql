import { editadminreq, editadminsucc } from "./ActionTypes"

const initialdata={
    editadminisLoading:false,
    editadminisError:false,
    data:[]
}

export const editadminreducer=(state=initialdata,action)=>{
    const {type,payload}=action

    switch(type){
        case editadminreq:{
            return {...state,editadminisLoading:true,editadminisError:false,data:[]}
        }
        case editadminsucc:{
            return {...state,editadminisLoading:false,editadminisError:false,data:payload.msg}
        }
        case editadminsucc:{
            return {...state,editadminisLoading:false,editadminisError:true,data:[]}
        }
        default:{
            return state
        }
    }
}