import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

export const startAddUser = createAsyncThunk("addUSer", async (formData, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/user_add";
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

export const startUpdateUser = createAsyncThunk("updateUser", async (formData, { rejectWithValue }) => {
  const Api = "https://api.voxprosolutions.com:8080/api/user_update";
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

export const startGetUserList = createAsyncThunk("getUser", async () => {
    const Api = "https://api.voxprosolutions.com:8080/api/user_lists";
    try {
        const response = await axios.get(Api, {
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

  export const startRemoveUser = createAsyncThunk("removeUser", async (formData, { rejectWithValue }) => {
    const Api = "https://api.voxprosolutions.com:8080/api/user_delete";
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
    userList:null,
    findData:null
  };

  const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(startAddUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startAddUser.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("added successfully")
        })
        .addCase(startAddUser.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
        });

        builder
        .addCase(startUpdateUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startUpdateUser.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("updated successfully")
        })
        .addCase(startUpdateUser.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
        });

        builder
        .addCase(startGetUserList.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startGetUserList.fulfilled, (state, action) => {
          state.loading = false;
          state.userList = action.payload;
        })
        .addCase(startGetUserList.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
        });

        builder
        .addCase(startRemoveUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(startRemoveUser.fulfilled, (state, action) => {
          state.loading = false;
          toast.success("Removed successfully")
        })
        .addCase(startRemoveUser.rejected, (state, action) => {
          state.loading = true;
          state.error = action.payload ? action.payload : action.error.message;
          toast.error(action.payload);
        });
  
    }
  });
  
  export default usersSlice.reducer;