import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";
import NoTokenAPI from "../services/notTokenAPI";

const initialState = {
  isLogenIn: false,
  signInError: null,
  signInStatus: "idle",
  signUpError: null,
  signUpStatus: "idle",
};
// Async thunks for sign-up and sign-in
export const signUp = createAsyncThunk("auth/signUp", async (userData) => {
  const response = await NoTokenAPI.post("/users/signup/", userData);
  return response.data;
});

export const signIn = createAsyncThunk("auth/signIn", async (credentials) => {
  const response = await NoTokenAPI.post("/users/login/", credentials);
  const { access } = response.data;
  localStorage.setItem("token", access); // Save JWT to localStorage
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.signInStatus = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signInStatus = "success";
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInStatus = "fail";
        state.signInError = action.error.message;
      })
      .addCase(signUp.pending, (state, action) => {
        state.signUpStatus = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpStatus = "success";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = "fail";
        state.signUpError = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
