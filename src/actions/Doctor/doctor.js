import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startGetDoctorList = createAsyncThunk("docList", async () => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_lists";
  const response = await axios.get(Api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.request.status)
  if(response.data.message === "Expired token"){
    console.log('Token Expired')
  }
  return response.data;
});

export const removeDoctor = createAsyncThunk("removeDoctor", async (id) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_delete";
  const data = id;
  const response = await axios.post(Api, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if(response.data.message === "Expired token"){
    console.log('Token Expired')
  }
  return response.data;
});

export const createDoctor = createAsyncThunk("createDoc", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_create";
  const data = formData;
  
  try {
    const response = await axios.post(Api, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.messages.errors)
  }
  // if(response.data.message === "Expired token"){
  //   console.log('Token Expired')
  // }
  
});

export const getTimeSlot = createAsyncThunk("getTimeSlot", async (id) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_time_slot";
  const data = id;
  const response = await axios.post(Api, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response)
  if(response.data.message === "Expired token"){
    console.log('Token Expired')
  }
  return response.data;
});

export const updateDoc = createAsyncThunk("updateDoc", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_update";
  const data = formData;
  const response = await axios.post(Api, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // if(response.data.message === "Expired token"){
  //   console.log('Token Expired',response.data.message)
  // }
  return response.data;
});

const initialState = {
  loading: false,
  error: null,
  list: null,
  timeSlot: null,
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
        state.list = action.payload;
      })
      .addCase(startGetDoctorList.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
        console.log(action);
        toast.error('Unable to fetch the data...', action.error.message)
      });

    builder
      .addCase(removeDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDoctor.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("removed successfully");
      })
      .addCase(removeDoctor.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
        toast.error('Something went wrong...', action.error.message)
      });

    builder
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        toast.success("created successfully");
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
        console.log(action)
        toast.error('Something went wrong...', action.error.message)
      });

    builder
      .addCase(getTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimeSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.timeSlot = action.payload;
      })
      .addCase(getTimeSlot.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
        toast.error('Something went wrong...', action.error.message)
      });

      builder
      .addCase(updateDoc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoc.fulfilled, (state, action) => {
        state.loading = false;
        // state.timeSlot = action.payload;
        toast.success('updated successfully');
      })
      .addCase(updateDoc.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
        toast.error('Something went wrong...', action.error.message)
      });
  },
});

export default doctorSlice.reducer;
