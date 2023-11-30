import { getcatfail, getcatreq,getcatsucc } from "./ActionTypes"

const initialdata={
    getcatisLoading:false,
    getcatisError:false,
    result:[]
}

export const getcatreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case getcatreq:{
            return {...state,getcatisLoading:true,getcatisError:false,result:[]}
        }
        case getcatsucc:{
            return {...state,getcatisError:false,getcatisLoading:false,result:payload.msg}
        }
        case getcatfail:{
            return {...state,getcatisError:true,getcatisLoading:false,result:[]}
        }
        default:{
            return state
        }
    }
}