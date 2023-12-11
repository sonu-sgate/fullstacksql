import { adminsideattenddatafail, adminsideattenddatareq, adminsideattenddatasucc } from "./ActionTypes"

const initialdata={
    attenddataisLoading:false,
    attenddataisError:false,
    attenddata:[]
}
export const adminsideattenddata=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case adminsideattenddatareq:{
            return {...state,attenddataisLoading:true,attenddataisError:false,attenddata:[]}
        }
        case adminsideattenddatasucc:{
            return {...state,attenddataisLoading:false,attenddataisError:false,attenddata:payload.msg}
        }
        case adminsideattenddatafail:{
            return {...state,attenddataisLoading:false,attenddataisError:true,attenddata:[]}
        }
        default:{
            return state
        }
    }
}