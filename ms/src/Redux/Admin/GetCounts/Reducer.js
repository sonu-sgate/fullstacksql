import { getcountfail, getcountreq, getcountsucc } from "./ActionTypes"

const initialdata={
    getcountisLoading:false,
    getcountisError:false,
    admincount:0,
    total:0,
    empcount:0,
    admins:[]
}
export const getcountreducer=(state=initialdata,action)=>{
    const {type,payload}=action
    console.log("payload",payload)
    switch(type){
        case getcountreq:{
            return {...state,admins:[],getcountisLoading:true,getcountisError:false,admincount:0,total:0,empcount:0}
        }
        case getcountsucc:{
            return {...state,getcountisLoading:false,getcountisError:false,admincount:payload.admincount,
                total:payload.total,empcount:payload.empcount,admins:payload.admins}
        }
        case getcountfail:{
            return {...state,admins:[],getcountisLoading:false,getcountisError:false,admincount:0,total:0,empcount:0}
        }
        default:{
            return state
        }
    }
}