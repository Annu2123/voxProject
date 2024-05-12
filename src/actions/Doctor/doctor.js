import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const startGetDoctorList = createAsyncThunk("login", async () => {
  const Api = "https://dev.voxprosolutions.com/api/doctor_lists";
  const headers = {
    Accept: "application/json",
    Authorization: token,
  };
  const response = await axios.post(Api, headers);
  console.log(response.data);
  return response.data;
});

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startGetDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startGetDoctorList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(startGetDoctorList.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default doctorSlice.reducer;
