import { addcatfail, addcatreq, addcatsucc } from "./ActionTypes"

const initialdata={
    addcatisLoading:false,
    addcatisError:false
}
export const addcatreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case addcatreq:{
            return {...state,addcatisLoading:true,addcatisError:false}
        }
        case addcatsucc:{
            return {...state,addcatisError:false,addcatisLoading:false}
        }
        case addcatfail:{
            return {...state,addcatisLoading:false,addcatisError:true}
        }
        default:{
            return state
        }
    }
}