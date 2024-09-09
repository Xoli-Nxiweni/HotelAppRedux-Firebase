import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase'; // Ensure this path is correct

// Thunk to book a room and store booking details in Firestore
export const bookRoom = createAsyncThunk('booking/bookRoom', async (bookingDetails, { rejectWithValue }) => {
  try {
    console.log('Booking Details:', bookingDetails); // Log booking details for debugging
    const bookingsCollectionRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingsCollectionRef, bookingDetails);
    console.log('Booking added with ID:', docRef.id); // Log success with document ID
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
      const room = state.rooms.find(room => room.id === roomId);
      if (room) {
        room.isFavorite = !room.isFavorite; // Toggle the isFavorite status
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookRoom.pending, (state) => {
        state.bookingStatus = 'loading';
      })
      .addCase(bookRoom.fulfilled, (state) => {
        state.bookingStatus = 'succeeded';
        // Reset booking details after successful booking
        state.bookingDetails = {
          checkInDate: '',
          checkOutDate: '',
          guestName: '',
          contactInfo: '',
          extras: [],
          specialRequests: '',
        };
      })
      .addCase(bookRoom.rejected, (state, action) => {
        state.bookingStatus = 'failed';
        state.error = action.payload; // Use action.payload for error message
      });
  },
});

export const { selectRoom, clearSelectedRoom, updateBookingDetails, resetBookingDetails, toggleFavorite } = bookingSlice.actions;

export default bookingSlice.reducer;
