import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFavorites as fetchFavoritesFromService,  } from '../services/dataService';
import { toggleFavorite } from './roomSlice';

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
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(favorite => favorite !== action.payload);
    }
  },
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
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { roomId, newFavoriteStatus, userId } = action.payload;

        if (newFavoriteStatus) {
          state.favorites.push(roomId);
        } else {
          state.favorites = state.favorites.filter(id => id !== roomId);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
