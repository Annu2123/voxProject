import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const startLoginUser = createAsyncThunk("login", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/login";
  const response = await axios.post(Api, formData);
  return response.data;
});

const initialState = {
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        // toast.success('Checking Credential...');
      })
      .addCase(startLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(startLoginUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
