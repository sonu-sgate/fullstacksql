import { editadminreq, editadminsucc } from "./ActionTypes"

const initialdata={
    editadminisLoading:false,
    editadminisError:false,
   
}

export const editadminreducer=(state=initialdata,action)=>{
    const {type,payload}=action

    switch(type){
        case editadminreq:{
            return {...state,editadminisLoading:true,editadminisError:false}
        }
        case editadminsucc:{
            return {...state,editadminisLoading:false,editadminisError:false}
        }
        case editadminsucc:{
            return {...state,editadminisLoading:false,editadminisError:true}
        }
        default:{
            return state
        }
    }
}