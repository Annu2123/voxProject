import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startAddPatient = createAsyncThunk("addPatient", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/patient_add";
  const data = formData
  const response = await axios.post(Api,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
//   if(response.data.message === "Expired token"){
//     console.log('Token Expired')
//   }
  return response.data;
});

export const startUpdatePatient = createAsyncThunk("updatePatient", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/patient_update";
  const data = formData
  const response = await axios.post(Api,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
//   if(response.data.message === "Expired token"){
//     console.log('Token Expired')
//   }
  return response.data;
});

export const searchPatient = createAsyncThunk("search", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/patient_find";
  const data = formData
  const response = await axios.post(Api,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
//   if(response.data.message === "Expired token"){
//     console.log('Token Expired')
//   }
  return response.data;
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
          state.error = action.error.message;
          if(action.error.message="Request failed with status code 409"){
            toast.error('Fill all fields')
          }else{
            toast.error('Something went wrong...',)
          }
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
          state.error = action.error.message;
          console.log(action.error.message)
          
          if(action.error.message="Request failed with status code 409"){
            toast.error('Please fill the unique data')
          }else{
            toast.error('Something went wrong...',)
          }
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
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
        //   console.log(action.error.message);
        });
  
    }
  });
  
  export default patientSlice.reducer;