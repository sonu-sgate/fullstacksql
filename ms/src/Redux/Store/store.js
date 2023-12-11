import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { legacy_createStore } from "redux";

import { adminloginreducer } from "../Authenticaton/Admin/Login/Reducer";
import { adminsignupreducer } from "../Authenticaton/Admin/Signup/Reducer";
import { addcatreducer } from "../Admin/AddCategory/Reducer";
import { getcatreducer } from "../Admin/GetCat/Reducer";
import { addempreducer } from "../Admin/Employee/AddEmployee/Reducer";
import { getempreducer } from "../Admin/Employee/GetEmployee/Reducer";
import { getsingleempreducer } from "../Admin/Employee/GetSingle/Reducer";
import { getcountreducer } from "../Admin/GetCounts/Reducer";
import { amdinlogoutreducer } from "../Admin/Logout/Reducer";
import { emploginreducer } from "../Authenticaton/Employee/Login/Reducer";
import { empprofilereducer } from "../Authenticaton/Employee/empProfile/Reducer";
import { reportreducer } from "../Authenticaton/Employee/Report/Reducer";
import { getempsidereducer } from "../Authenticaton/Employee/GetEmp/Reducer";
import { getadmindatareducer } from "../Admin/GetAdmins/Reducer";
import { usersignoutreducer } from "../Authenticaton/Employee/Attendence/SignOut/Reducer";
import { getattendreducer } from "../Authenticaton/Employee/Attendence/Get/Reducer";

const rootreducers=combineReducers({adminloginreducer,adminsignupreducer,getattendreducer,addcatreducer,getcatreducer,
 reportreducer,getempsidereducer,getadmindatareducer,usersignoutreducer,getattendreducer,  addempreducer,getempreducer,getsingleempreducer,getcountreducer,amdinlogoutreducer,emploginreducer,empprofilereducer})
export const store=legacy_createStore(rootreducers,applyMiddleware(thunk))