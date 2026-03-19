import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/api.js";

// LOGIN USER FROM BACKEND
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {

    // send login request to backend
    const res = await API.post("/auth/login", userData);


    // save token in localStorage
    localStorage.setItem("token", res.data.token);

localStorage.setItem("user",JSON.stringify(res.data.user));
    // return user data to redux
    return res.data.user;
  }
);
const initialState={
  isLoggedIn : !!
  localStorage.getItem("token"),
  user:
  JSON.parse(localStorage.getItem("user"))
  || null,
};

// REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {

    const res = await API.post("/auth/register", userData);

    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    // logout user
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;

      // remove token
      localStorage.removeItem("token");
      localStorage.removeItem("user")
    },
  },

  extraReducers: (builder) => {

    builder

      // LOGIN SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;