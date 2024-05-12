import { combineReducers } from "redux";

import user from "../actions/Auth/user";
import doctor from "../actions/Doctor/doctor";
const reducers = combineReducers({ user, doctor });

export default reducers;
