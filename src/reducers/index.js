import { combineReducers } from "redux";

import user from "../actions/Auth/user";
import doctorSlice from "../actions/Doctor/doctor";
import appointmentSlice from "../actions/Appointment/appointment";
const reducers = combineReducers({ user, doctorSlice,appointmentSlice });

export default reducers;
