import { combineReducers } from "redux";

import user from "../actions/Auth/user";
import doctorSlice from "../actions/Doctor/doctor";
import appointmentSlice from "../actions/Appointment/appointment";
import departmentSlice from "../actions/Department/department";
import religionSlice from "../actions/Religion/religion";
import referBySlice from "../actions/ReferBy/referBy";
import patientSlice from "../actions/Patient/patient";
import manageLeadsSlice from "../actions/ManageLeads/manageLeads";

const reducers = combineReducers({
  user,
  doctorSlice,
  appointmentSlice,
  departmentSlice,
  religionSlice,
  referBySlice,
  patientSlice,
  manageLeadsSlice
});

export default reducers;
