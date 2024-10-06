// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   getDocs,
//   getDoc,
//   collection,
//   doc,
//   updateDoc,
// } from 'firebase/firestore';
// import { db } from '../../Firebase/firebase';

// // Thunk for fetching rooms from Firestore
// export const fetchRooms = createAsyncThunk(
//   'rooms/fetchRooms',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'hotelRooms'));
//       const rooms = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           ...data,
//           isFavorite: data.favorites?.includes(userId) || false, // Check if userId is in favorites
//         };
//       });
//       return rooms;
//     } catch (error) {
//       console.error('Error fetching rooms:', error);
//       return rejectWithValue(error.message);
//     }
//   }
// );


// // Create the rooms slice
// const roomSlice = createSlice({
//   name: 'rooms',
//   initialState: {
//     rooms: [],
//     filteredRooms: [],
//     searchQuery: '',
//     selectedRoom: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//       // Filter rooms based on the search query
//       state.filteredRooms = state.rooms.filter((room) =>
//         room.heading?.toLowerCase().includes(state.searchQuery.toLowerCase())
//       );
//     },
//     setSelectedRoom: (state, action) => {
//       // Find the room by id
//       state.selectedRoom = state.rooms.find((room) => room.id === action.payload);
//     },
//     clearSelectedRoom: (state) => {
//       state.selectedRoom = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch rooms
//       .addCase(fetchRooms.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchRooms.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.rooms = action.payload;
//         state.filteredRooms = action.payload; // Set filteredRooms to all fetched rooms initially
//       })
//       .addCase(fetchRooms.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//   },
// });

// // Export actions and reducer
// export const { setSearchQuery, setSelectedRoom, clearSelectedRoom } = roomSlice.actions;
// export default roomSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk for fetching rooms from Firestore
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (userId, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'hotelRooms'));
      const rooms = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          isFavorite: data.favorites?.includes(userId) || false, // Check if userId is in favorites
        };
      });
      return rooms;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Create the rooms slice
const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    filteredRooms: [],
    searchQuery: '',
    selectedRoom: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // Filter rooms based on the search query
      state.filteredRooms = state.rooms.filter((room) =>
        room.heading?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    setSelectedRoom: (state, action) => {
      // Find the room by id
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
        state.filteredRooms = action.payload; // Set filteredRooms to all fetched rooms initially
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setSearchQuery, setSelectedRoom, clearSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;
