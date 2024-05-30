import { combineReducers } from "redux";

import userSlice from "../actions/Auth/user";
import doctorSlice from "../actions/Doctor/doctor";
import appointmentSlice from "../actions/Appointment/appointment";
import departmentSlice from "../actions/Department/department";
import religionSlice from "../actions/Religion/religion";
import referBySlice from "../actions/ReferBy/referBy";
import patientSlice from "../actions/Patient/patient";
import manageLeadsSlice from "../actions/ManageLeads/manageLeads";
import usersSlice from "../actions/Users/users";
import callActivitySlice from "../actions/CallActivity/callActivity";

const reducers = combineReducers({
  userSlice,
  doctorSlice,
  appointmentSlice,
  departmentSlice,
  religionSlice,
  referBySlice,
  patientSlice,
  manageLeadsSlice,
  usersSlice,
  callActivitySlice
});

export default reducers;
