import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const startLoginUser = createAsyncThunk("login", async (formData) => {
  const Api = "https://api.voxprosolutions.com:8080/api/login";
  const response = await axios.post(Api, formData);
  console.log(response.data)
  return response.data;
});

const initialState = {
  loading: false,
  error: null,
  userDetails: null,
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
        localStorage.setItem('fname', action.payload.fname);
        localStorage.setItem('lname', action.payload.lname);
        localStorage.setItem('roles', action.payload.roles);
        localStorage.setItem('email_id', action.payload.email_id);
        localStorage.setItem('telephone_ext', action.payload.telephone_ext);
        
        // Save hidden action.payload in sessionStorage
        sessionStorage.setItem('msg_queue_id', action.payload.msg_queue_id);
        state.userDetails = action.payload;
      })
      .addCase(startLoginUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
