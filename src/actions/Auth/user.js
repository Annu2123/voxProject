import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const startLoginUser = createAsyncThunk("login", async (formData) => {
  const Api = "https://dev.voxprosolutions.com/api/login";
  const response = await axios.post(Api, formData);
  // console.log(response.data)
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
