import { empprofilefail, empprofilereq, empprofilesucc } from "./Actiontypes"

const initialdata={
    profileisLoading:false,
    profileisError:false,
    profile:[]
}
export const empprofilereducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case empprofilereq:{
            return {...state,profileisLoading:true,profileisError:false,profile:[]}
        }
        case empprofilesucc:{
            return {...state,profileisLoading:false,profileisError:false,profile:payload.profile}}
            case empprofilefail:{
                return {...state,profileisLoading:false,profileisError:true,profile:[]}
            }
            default:{
                return state
            }
    }
    
}