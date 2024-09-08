import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk to fetch available rooms from Firestore
export const fetchRooms = createAsyncThunk('booking/fetchRooms', async () => {
  try {
    const roomsCollectionRef = collection(db, 'hotelRooms');
    const querySnapshot = await getDocs(roomsCollectionRef);
    const roomsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return roomsList;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
});

// Thunk to book a room and store booking details in Firestore
export const bookRoom = createAsyncThunk('booking/bookRoom', async (bookingDetails, { rejectWithValue }) => {
  try {
    const bookingsCollectionRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingsCollectionRef, bookingDetails);
    return { id: docRef.id, ...bookingDetails };
  } catch (error) {
    console.error('Error booking room:', error);
    return rejectWithValue(error.message);
  }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    rooms: [],
    selectedRoom: null,
    bookingDetails: {
      checkInDate: '',
      checkOutDate: '',
      guestName: '',
      contactInfo: '',
      extras: [],
      specialRequests: '',
    },
    status: 'idle',
    error: null,
    bookingStatus: 'idle',
  },
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = state.rooms.find(room => room.id === action.payload);
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null;
    },
    updateBookingDetails: (state, action) => {
      state.bookingDetails = { ...state.bookingDetails, ...action.payload };
    },
    resetBookingDetails: (state) => {
      state.bookingDetails = {
        checkInDate: '',
        checkOutDate: '',
        guestName: '',
        contactInfo: '',
        extras: [],
        specialRequests: '',
      };
    },
    toggleFavorite: (state, action) => {
      const roomId = action.payload;
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        room.isFavorite = !room.isFavorite; // Toggle the isFavorite status
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
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(bookRoom.pending, (state) => {
        state.bookingStatus = 'loading';
      })
      .addCase(bookRoom.fulfilled, (state) => {
        state.bookingStatus = 'succeeded';
        // Optionally handle successful booking here
      })
      .addCase(bookRoom.rejected, (state, action) => {
        state.bookingStatus = 'failed';
        state.error = action.payload; // Use action.payload for error message
      });
  },
});

export const { selectRoom, clearSelectedRoom, updateBookingDetails, resetBookingDetails } = bookingSlice.actions;

export default bookingSlice.reducer;
