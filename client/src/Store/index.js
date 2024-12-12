// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Import the authSlice reducer
import prodReducer from './prodSlice';  // Import prodSlice

const store = configureStore({
  reducer: {
    auth: authReducer,   // Add authReducer to manage authentication state
    prod: prodReducer,   // Add prodReducer for backend link
  },
});

export default store;
