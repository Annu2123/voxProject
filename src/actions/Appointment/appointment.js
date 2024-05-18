import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startGetAppoinmentsList = createAsyncThunk("appoinmentList", async (date) => {
  const Api = "https://dev.voxprosolutions.com/api/appointment_lists";
  const data = date
  const response = await axios.post(Api,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const appointmentDetails = createAsyncThunk("appointment_list_details", async (formData) => {
    const Api = "https://dev.voxprosolutions.com/api/appointment_list_details";
    const data = formData
    const response = await axios.post(Api,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

  export const appointmentDelete = createAsyncThunk("appointment_delete", async (id) => {
    const Api = "https://dev.voxprosolutions.com/api/appointment_delete";
    const data = id
    const response = await axios.post(Api,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

const initialState = {
    loading: false,
    error: null,
    appointment: null,
    details:null
  };

  const appointmentSlice = createSlice({
    name: "appointmentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(startGetAppoinmentsList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startGetAppoinmentsList.fulfilled, (state, action) => {
          state.loading = false;
          state.appointment = action.payload;
        })
        .addCase(startGetAppoinmentsList.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          console.log(action.error.message);
          toast.error('Unable to fetch data...', action.error.message)
        });

        builder
        .addCase(appointmentDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(appointmentDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.details = action.payload;
        })
        .addCase(appointmentDetails.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          console.log(action.error.message);
          toast.error('Something went wrong...', action.error.message)
        });

        builder
        .addCase(appointmentDelete.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(appointmentDelete.fulfilled, (state, action) => {
          state.loading = false;
          toast.success('removed successfully')
        })
        .addCase(appointmentDelete.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          console.log(action.error.message);
          toast.error('Something went wrong...', action.error.message)
        });
  
    }
  });
  
  export default appointmentSlice.reducer;