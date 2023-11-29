const { combineReducers, legacy_createStore, applyMiddleware } = require("redux");
import { adminloginreducer } from "../Authenticaton/Admin/Login/Reducer";
const rootreducers=combineReducers({adminloginreducer})
export const store=legacy_createStore(rootreducers,applyMiddleware(thunk))