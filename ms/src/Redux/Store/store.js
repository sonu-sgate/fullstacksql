import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { legacy_createStore } from "redux";

import { adminloginreducer } from "../Authenticaton/Admin/Login/Reducer";
import { adminsignupreducer } from "../Authenticaton/Admin/Signup/Reducer";
import { addcatreducer } from "../Admin/AddCategory/Reducer";
import { getcatreducer } from "../Admin/GetCat/Reducer";
import { addempreducer } from "../Admin/Employee/AddEmployee/Reducer";
const rootreducers=combineReducers({adminloginreducer,adminsignupreducer,addcatreducer,getcatreducer,addempreducer})
export const store=legacy_createStore(rootreducers,applyMiddleware(thunk))