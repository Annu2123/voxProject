import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

// export const startGetDoctorList = createAsyncThunk("docList", async () => {
//   const Api = "https://api.voxprosolutions.com:8080/api/doctor_lists";
//   const response = await axios.get(Api, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log('response')
//   return response.data;
  // try {
  //   const response = await axios.get(Api, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(response)
  //   return response.data;
  // } catch (error) {
  //   if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.errors) {
  //     const errorMessages = error.response.data.messages.errors;
  //     const formattedErrors = Object.values(errorMessages).flat().join(', ');
  //     return rejectWithValue(formattedErrors);
  //   }
  //   console.log(error.message)
  //   return rejectWithValue(error.message);
  // }
// });
export const startGetDoctorList = createAsyncThunk("docList", async () => {
  try {
    const Api = "https://api.voxprosolutions.com:8080/api/doctor_lists";
    if(token){
      const response = await axios.get(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch doctor list:", error);
    throw error; 
  }
});

export const removeDoctor = createAsyncThunk("removeDoctor", async (id, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_delete";
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

export const createDoctor = createAsyncThunk("createDoc", async (formData, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_create";
  
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

export const getTimeSlot = createAsyncThunk("getTimeSlot", async (id) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_time_slot";
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

export const updateDoc = createAsyncThunk("updateDoc", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/doctor_update";
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
        state.error = action.payload ? action.payload : action.error.message;
        toast.error(action.payload);
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
        state.error = action.payload ? action.payload : action.error.message;
        toast.error(action.payload);
      });

    builder
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("created successfully");
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload ? action.payload : action.error.message;
        toast.error(action.payload);
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
        state.error = action.payload ? action.payload : action.error.message;
        toast.error(action.payload);
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
        state.error = action.payload ? action.payload : action.error.message;
        toast.error(action.payload);
      });
  },
});

export default doctorSlice.reducer;
