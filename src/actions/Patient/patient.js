import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startAddPatient = createAsyncThunk("addPatient", async (formData, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/patient_add";
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

export const startUpdatePatient = createAsyncThunk("updatePatient", async (formData, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/patient_update";
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

export const searchPatient = createAsyncThunk("search", async (formData, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/patient_find";
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

export const startGetPatientList = createAsyncThunk("getPatientList", async () => {
    const Api = "https://api.voxprosolutions.com:8080/api/patient_lists";
    const response = await axios.get(Api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

const initialState = {
    loading: false,
    error: null,
    patientList:null,
    findData:null
  };

  const patientSlice = createSlice({
    name: "patientSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(startAddPatient.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startAddPatient.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("added successfully")
        })
        .addCase(startAddPatient.rejected, (state, action) => {
          state.loading = true;
          // state.error = action.payload ? action.payload : action.error.message;
          const error = action.payload ? action.payload : action.error.message;
          const errorMessages = error.split(',');
          const firstError = errorMessages[0].trim();
          state.error=firstError
          toast.error(state.error);
        });

        builder
        .addCase(startUpdatePatient.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startUpdatePatient.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("updated successfully")
        })
        .addCase(startUpdatePatient.rejected, (state, action) => {
          state.loading = true;
          const error = action.payload ? action.payload : action.error.message;
          const errorMessages = error.split(',');
          const firstError = errorMessages[0].trim();
          state.error=firstError
          toast.error(action.payload);
        });

        builder
        .addCase(startGetPatientList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startGetPatientList.fulfilled, (state, action) => {
          state.loading = false;
          state.patientList = action.payload;
        })
        .addCase(startGetPatientList.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
        //   console.log(action.error.message);
        });

        builder
        .addCase(searchPatient.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(searchPatient.fulfilled, (state, action) => {
          state.loading = false;
          state.findData = action.payload;
        })
        .addCase(searchPatient.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
        });
  
    }
  });
  
  export default patientSlice.reducer;