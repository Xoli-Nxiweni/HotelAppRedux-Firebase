import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk for toggling favorite status
export const toggleFavorite = createAsyncThunk(
  'rooms/toggleFavorite',
  async ({ roomId, userId }, { rejectWithValue }) => {
    try {
      const favoriteDocId = `${userId}_${roomId}`;
      const favoriteDocRef = doc(db, 'favorites', favoriteDocId);

      const favoriteDoc = await getDoc(favoriteDocRef);

      if (favoriteDoc.exists()) {
        // If it exists, remove it (unfavorite)
        await deleteDoc(favoriteDocRef);
        return { roomId, newFavoriteStatus: false };
      } else {
        // If it doesn't exist, add it
        await setDoc(favoriteDocRef, {
          userId,
          roomId,
          addedAt: new Date().toISOString(),
        });
        return { roomId, newFavoriteStatus: true };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching rooms (if needed)
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'rooms'));
      const rooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return rooms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Main slice for managing rooms and favorites
const favoritesSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    filteredRooms: [],
    favorites: [], // Array of favorite rooms
    searchQuery: '',
    selectedRoom: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredRooms = state.rooms.filter((room) =>
        room.heading?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = state.rooms.find((room) => room.id === action.payload);
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch rooms
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload;
        state.filteredRooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Toggle favorite
      .addCase(toggleFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { roomId, newFavoriteStatus } = action.payload;

        // Update the isFavorite status in rooms and filteredRooms
        state.rooms = state.rooms.map((room) =>
          room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
        );
        state.filteredRooms = state.filteredRooms.map((room) =>
          room.id === roomId ? { ...room, isFavorite: newFavoriteStatus } : room
        );

        // Update favorites array
        if (newFavoriteStatus) {
          const roomToAdd = state.rooms.find((room) => room.id === roomId);
          if (roomToAdd) {
            state.favorites.push(roomToAdd);
          }
        } else {
          state.favorites = state.favorites.filter((room) => room.id !== roomId);
        }

        state.status = 'succeeded';
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setSearchQuery, setSelectedRoom, clearSelectedRoom } = favoritesSlice.actions;
export default favoritesSlice.reducer;
