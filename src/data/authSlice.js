import { createSlice } from "@reduxjs/toolkit";
// authslice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  // reducers
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // {email}
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
