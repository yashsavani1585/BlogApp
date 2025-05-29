// src/redux/prodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const prodSlice = createSlice({
  name: 'prod',
  initialState: {
    link: "https://blogapp-back-4ooc.onrender.com",
        // link: "http://localhost:3000",

  },
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setLink } = prodSlice.actions;

export default prodSlice.reducer;
