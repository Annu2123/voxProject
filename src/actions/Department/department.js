import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startAddDept = createAsyncThunk("addDept", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/department_add";
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

export const startGetDeptList = createAsyncThunk("getDept", async () => {
    const Api = "https://api.voxprosolutions.com:8080/api/department_lists";
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

  export const startDeleteDept = createAsyncThunk("deleteDept", async (id) => {
    const Api = "https://api.voxprosolutions.com:8080/api/department_delete";
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
    deptList:null,
  };

  const departmentSlice = createSlice({
    name: "departmentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(startAddDept.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startAddDept.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("added successfully")
        })
        .addCase(startAddDept.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
        });

        builder
        .addCase(startGetDeptList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startGetDeptList.fulfilled, (state, action) => {
          state.loading = false;
          state.deptList = action.payload;
        })
        .addCase(startGetDeptList.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
          console.log(action.error.message);
        });

        builder
        .addCase(startDeleteDept.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startDeleteDept.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("Removed successfully")
        })
        .addCase(startDeleteDept.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
          toast.error('Something went wrong...', action.error.message)
          console.log(action.error.message);
        });
  
    }
  });
  
  export default departmentSlice.reducer;