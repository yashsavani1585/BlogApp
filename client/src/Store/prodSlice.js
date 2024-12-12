// src/redux/prodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const prodSlice = createSlice({
  name: 'prod',
  initialState: {
    link: "https://blogapp-1-56pl.onrender.com"
  },
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setLink } = prodSlice.actions;

export default prodSlice.reducer;
