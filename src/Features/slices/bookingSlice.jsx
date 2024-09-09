import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk to book a room and store booking details in Firestore
export const bookRoom = createAsyncThunk(
  'booking/bookRoom',
  async (bookingDetails, { rejectWithValue }) => {
    try {
      console.log('Attempting to add booking:', bookingDetails);

      const {
        userId,
        selectedRoomId,
        checkInDate,
        checkOutDate,
        guestName,
        contactInfo,
        extras,
        specialRequests,
        review,
        paymentMethodId,
        totalAmount,
        numRooms,
        numGuests
      } = bookingDetails;

      // Validate required booking details
      if (!userId || !selectedRoomId || !checkInDate || !checkOutDate || !guestName || !contactInfo) {
        throw new Error('Missing required booking details');
      }

      // Add booking details to Firestore
      const bookingsCollectionRef = collection(db, 'bookings');
      const docRef = await addDoc(bookingsCollectionRef, {
        userId,
        selectedRoomId,
        checkInDate,
        checkOutDate,
        guestName,
        contactInfo,
        extras,
        specialRequests,
        review,
        paymentMethodId,
        totalAmount,
        numRooms,
        numGuests,
        createdAt: new Date(),
      });

      console.log('Booking added with ID:', docRef.id);

      return { id: docRef.id, ...bookingDetails };
    } catch (error) {
      console.error('Error adding booking:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

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
      review: '',
      paymentMethodId: '',
      totalAmount: 0,
      userId: '',
      selectedRoomId: '',
      numRooms: 1,
      numGuests: 1
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
        review: '',
        paymentMethodId: '',
        totalAmount: 0,
        userId: '',
        selectedRoomId: '',
        numRooms: 1,
        numGuests: 1
      };
    },
    toggleFavorite: (state, action) => {
      const roomId = action.payload;
      const room = state.rooms.find(room => room.id === roomId);
      if (room) {
        room.isFavorite = !room.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookRoom.pending, (state) => {
        state.bookingStatus = 'loading';
      })
      .addCase(bookRoom.fulfilled, (state, action) => {
        state.bookingStatus = 'succeeded';
        console.log('Booking success:', action.payload);
        // Reset booking details after a successful booking
        state.bookingDetails = {
          checkInDate: '',
          checkOutDate: '',
          guestName: '',
          contactInfo: '',
          extras: [],
          specialRequests: '',
          review: '',
          paymentMethodId: '',
          totalAmount: 0,
          userId: '',
          selectedRoomId: '',
          numRooms: 1,
          numGuests: 1
        };
      })
      .addCase(bookRoom.rejected, (state, action) => {
        state.bookingStatus = 'failed';
        console.error('Booking error:', action.payload);
        state.error = action.payload;
      });
  },
});

export const { selectRoom, clearSelectedRoom, updateBookingDetails, resetBookingDetails, toggleFavorite } = bookingSlice.actions;

export default bookingSlice.reducer;
