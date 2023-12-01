import { getsinglefail, getsinglereq, getsinglesucc } from "./ActionTypes"

const initialdata={
    getsingleempisLoading:false,
    getsingleempisError:false,
    result:[]
}
export const getsingleempreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case getsinglereq:{
            return {...state,getsingleempisLoading:true,getsingleempisError:false,result:[]}
        }
        case getsinglesucc:{
            return {...state,getsingleempisLoading:false,getsingleempisError:false,result:payload.msg}
        }
        case getsinglefail:{
            return {...state,getsingleempisLoading:false,getsingleempisError:true,result:[]}
        }
        default:{
            return state
        }
    }
}