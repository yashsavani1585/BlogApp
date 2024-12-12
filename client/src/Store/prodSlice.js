// src/redux/prodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const prodSlice = createSlice({
  name: 'prod',
  initialState: {
    link: 'http://localhost:3000',  // Default link for local development
  },
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setLink } = prodSlice.actions;

export default prodSlice.reducer;
