import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { legacy_createStore } from "redux";

import { adminloginreducer } from "../Authenticaton/Admin/Login/Reducer";
import { adminsignupreducer } from "../Authenticaton/Admin/Signup/Reducer";
import { addcatreducer } from "../Admin/AddCategory/Reducer";
const rootreducers=combineReducers({adminloginreducer,adminsignupreducer,addcatreducer})
export const store=legacy_createStore(rootreducers,applyMiddleware(thunk))