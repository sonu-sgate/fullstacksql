import { addempfail, addempreq, addempsucc } from "./ActionTypes"

const initialdata={
    addempisLoading:false,
    addempisError:false
}
export const addempreducer=(state=initialdata,action)=>{
    const {type,payload}=action

    switch(type){
        case addempreq:{
            return {...state,addempisLoading:true,addempisError:false}
        }
        case addempsucc:{
            return {...state,addempisLoading:false,addempisError:false}
        }
        case addempfail:{
            return {...state,addempisLoading:false,addempisError:true}
        }
        default:{
            return state
        }
    }
}