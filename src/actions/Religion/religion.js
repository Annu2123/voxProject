import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startAddRelgn = createAsyncThunk("addRelgn", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/religion_add";
  const data = formData
  const response = await axios.post(Api,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const startGetRelgnList = createAsyncThunk("getDept", async () => {
    const Api = "https://api.voxprosolutions.com:8080/api/religion_lists";
    const response = await axios.get(Api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

  export const startDeleteRelgn = createAsyncThunk("deleteDept", async (id) => {
    const Api = "https://api.voxprosolutions.com:8080/api/religion_delete";
    const data = id
    const response = await axios.post(Api,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

const initialState = {
    loading: false,
    error: null,
    relgnList:null,
  };

  const religionSlice = createSlice({
    name: "religionSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(startAddRelgn.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startAddRelgn.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("added successfully")
        })
        .addCase(startAddRelgn.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
        });

        builder
        .addCase(startGetRelgnList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startGetRelgnList.fulfilled, (state, action) => {
          state.loading = false;
          state.relgnList = action.payload;
        })
        .addCase(startGetRelgnList.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
          console.log(action.error.message);
        });

        builder
        .addCase(startDeleteRelgn.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startDeleteRelgn.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("Removed successfully")
        })
        .addCase(startDeleteRelgn.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
          console.log(action.error.message);
        });
  
    }
  });
  
  export default religionSlice.reducer;