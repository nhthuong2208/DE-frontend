import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: ""
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload
      localStorage.setItem("token", action.payload)
    },
    logout: (state, action) => {
      state.token = ""
      localStorage.setItem("token", "")
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
