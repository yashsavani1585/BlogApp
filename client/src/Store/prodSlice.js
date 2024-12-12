// src/redux/prodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const prodSlice = createSlice({
  name: 'prod',
  initialState: {
    link: "https://blogapp-back-4ooc.onrender.com",
  },
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setLink } = prodSlice.actions;

export default prodSlice.reducer;
