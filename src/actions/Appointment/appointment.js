import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startGetAppoinmentsList = createAsyncThunk("appoinmentList", async (date, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/appointment_lists";
  try {
    const response = await axios.post(Api, date, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.errors) {
      const errorMessages = error.response.data.messages.errors;
      const formattedErrors = Object.values(errorMessages).flat().join(', ');
      return rejectWithValue(formattedErrors);
    }
    return rejectWithValue(error.message);
  }
});

export const appointmentDetails = createAsyncThunk("appointment_list_details", async (formData, { rejectWithValue }) => {
    const Api = "https://api.voxprosolutions.com:8080/api/appointment_list_details";
    try {
      const response = await axios.post(Api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.errors) {
        const errorMessages = error.response.data.messages.errors;
        const formattedErrors = Object.values(errorMessages).flat().join(', ');
        return rejectWithValue(formattedErrors);
      }
      return rejectWithValue(error.message);
    }
  });

  export const appointmentDelete = createAsyncThunk("appointment_delete", async (id) => {
    const Api = "https://api.voxprosolutions.com:8080/api/appointment_delete";
    try {
      const response = await axios.post(Api, id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.errors) {
        const errorMessages = error.response.data.messages.errors;
        const formattedErrors = Object.values(errorMessages).flat().join(', ');
        return rejectWithValue(formattedErrors);
      }
      return rejectWithValue(error.message);
    }
  });

  export const addAppoinment = createAsyncThunk("appointment_add", async (formData) => {
    const Api = "https://api.voxprosolutions.com:8080/api/appointment_add";
    try {
      const response = await axios.post(Api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.errors) {
        const errorMessages = error.response.data.messages.errors;
        const formattedErrors = Object.values(errorMessages).flat().join(', ');
        return rejectWithValue(formattedErrors);
      }
      return rejectWithValue(error.message);
    }
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
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
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
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
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
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
        });

        builder
        .addCase(addAppoinment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addAppoinment.fulfilled, (state, action) => {
          state.loading = false;
          toast.success('Added successfully')
        })
        .addCase(addAppoinment.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
        });
  
    }
  });
  
  export default appointmentSlice.reducer;