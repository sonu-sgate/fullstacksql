import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { legacy_createStore } from "redux";

import { adminloginreducer } from "../Authenticaton/Admin/Login/Reducer";
const rootreducers=combineReducers({adminloginreducer})
export const store=legacy_createStore(rootreducers,applyMiddleware(thunk))