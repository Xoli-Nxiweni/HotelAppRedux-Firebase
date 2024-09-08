import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk for fetching rooms from Firestore
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'hotelRooms'));
    const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Rooms returned:', rooms); // Log the rooms data for debugging
    return rooms;
  } catch (error) {
    console.log('Error fetching rooms:', error.message); // Log the actual error message
    return rejectWithValue(error.message);
  }
});

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [], // Initialize rooms as an empty array
    filteredRooms: [], // Initialize filteredRooms as an empty array
    searchQuery: '', // Track search query for filtering
    selectedRoom: null, // Track selected room for details
    status: 'idle', // Idle, loading, succeeded, or failed
    error: null, // Handle errors
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // Filter rooms based on search query
      state.filteredRooms = state.rooms.filter(room =>
        room.heading?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = state.rooms.find(room => room.id === action.payload);
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
    toggleFavorite: (state, action) => {
      const roomId = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        room.isFavorite = !room.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setSearchQuery, setSelectedRoom, clearSelectedRoom, toggleFavorite } = roomSlice.actions;
export default roomSlice.reducer;
