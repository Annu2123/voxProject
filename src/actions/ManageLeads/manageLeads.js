import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startGetPatient = createAsyncThunk("patientList", async () => {
  const Api = "https://api.voxprosolutions.com:8080/api/patient_lists";

  const response = await axios.get(Api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const searchPatient = createAsyncThunk("searchP", async (formData) => {
    const Api = "https://api.voxprosolutions.com:8080/api/patient_find";
  
    const response = await axios.post(Api,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

  export const startGetActivityList = createAsyncThunk("activityList", async (formData, { rejectWithValue }) => {
    const Api = "https://api.voxprosolutions.com:8080/api/call_activity_list";
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


// export const createDoctor = createAsyncThunk("createDoc", async (formData, { rejectWithValue }) => {
//   const Api = "https://api.voxprosolutions.com:8080/api/doctor_create";
  
//   try {
//     const response = await axios.post(Api, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.errors) {
//       const errorMessages = error.response.data.messages.errors;
//       const formattedErrors = Object.values(errorMessages).flat().join(', ');
//       return rejectWithValue(formattedErrors);
//     }
//     return rejectWithValue(error.message);
//   }
// });

const initialState = {
  loading: false,
  error: null,
  callActivityList: null,
//   searchPatient:null
};

const manageLeadsSlice = createSlice({
  name: "manageLeadsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startGetPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startGetPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList = action.payload;
      })
      .addCase(startGetPatient.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
        console.log(action);
        toast.error('Unable to fetch the data...')
      });

      builder
      .addCase(searchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList = action.payload;
      })
      .addCase(searchPatient.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
        console.log(action);
        toast.error('Unable to fetch the data...')
      });

      builder
      .addCase(startGetActivityList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startGetActivityList.fulfilled, (state, action) => {
        state.loading = false;
        state.callActivityList = action.payload;
      })
      .addCase(startGetActivityList.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload ? action.payload : action.error.message;
        toast.error(action.payload);
      });
  },
});

export default manageLeadsSlice.reducer;
