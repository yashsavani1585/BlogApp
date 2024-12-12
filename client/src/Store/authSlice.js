// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('token') ? true : false, // Check if token exists in localStorage
  token: localStorage.getItem('token') || null, // Get token from localStorage if it exists
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Store token in localStorage
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
});

// Exporting the reducer as default
export const authActions = authSlice.actions;  // Updated export name to `authActions`
export default authSlice.reducer;
