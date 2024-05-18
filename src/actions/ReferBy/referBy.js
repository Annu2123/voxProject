import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startAddRefer = createAsyncThunk("addRefer", async (formData) => {
  const Api = "https://dev.voxprosolutions.com/api/refered_by_add";
  const data = formData
  const response = await axios.post(Api,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if(response.data.message === "Expired token"){
    console.log('Token Expired')
  }
  return response.data;
});

export const startGetReferList = createAsyncThunk("getRefer", async () => {
    const Api = "https://dev.voxprosolutions.com/api/refered_by_lists";
    const response = await axios.get(Api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.data.message === "Expired token"){
      console.log('Token Expired')
    }
    return response.data;
  });

  export const startDeleteRefer = createAsyncThunk("deleteRefer", async (id) => {
    const Api = "https://dev.voxprosolutions.com/api/refered_by_delete";
    const data = id
    const response = await axios.post(Api,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.data.message === "Expired token"){
      console.log('Token Expired')
    }
    return response.data;
  });

const initialState = {
    loading: false,
    error: null,
    referList:null,
  };

  const referBySlice = createSlice({
    name: "referBySlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(startAddRefer.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startAddRefer.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("added successfully")
        })
        .addCase(startAddRefer.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
        });

        builder
        .addCase(startGetReferList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startGetReferList.fulfilled, (state, action) => {
          state.loading = false;
          state.referList = action.payload;
        })
        .addCase(startGetReferList.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
          console.log(action.error.message);
        });

        builder
        .addCase(startDeleteRefer.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startDeleteRefer.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("Removed successfully")
        })
        .addCase(startDeleteRefer.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
          console.log(action.error.message);
        });
  
    }
  });
  
  export default referBySlice.reducer;