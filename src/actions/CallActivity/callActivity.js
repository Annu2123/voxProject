import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const searchActivity = createAsyncThunk("searchA", async (formData,{rejectWithValue}) => {
    const Api = "https://api.voxprosolutions.com:8080/api/call_activity_search";
  
    try {
      const response = await axios.post(Api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
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
  callList: null,
};

const callActivitySlice = createSlice({
  name: "callActivitySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

      builder
      .addCase(searchActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.callList = action.payload;
      })
      .addCase(searchActivity.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload ? action.payload : action.error.message;
        toast.error(action.payload);
      });
  },
});

export default callActivitySlice.reducer;
