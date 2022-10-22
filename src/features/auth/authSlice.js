import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  name: null,
  email: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.authenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: state => {
      state.authenticated = false;
      state.name = null;
      state.email = null;
    }
  }
});

export const { signup, logout } = authSlice.actions;
export default authSlice.reducer;
