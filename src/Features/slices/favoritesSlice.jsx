// src/slices/favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFavorites as fetchFavoritesFromService } from '../services/dataService';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const favorites = await fetchFavoritesFromService(userId);
      return favorites;
    } catch (error) {
      console.error('Error fetching favorites:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
