// src/Features/slices/userProfileSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    bookings: [],
    favorites: [],
    isLoading: false,
    error: null,
    success: null
  },
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.success = null;
    }
  }
});

export const {
  setBookings,
  setFavorites,
  setLoading,
  setError,
  setSuccess,
  clearError,
  clearSuccess
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
